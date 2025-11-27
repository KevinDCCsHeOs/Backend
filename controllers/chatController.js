import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js'; // Importamos createClient directamente
import dotenv from 'dotenv';

dotenv.config();

// 1. CONFIGURACIÓN DEL CLIENTE ADMIN (SUPERPODERES) 🦸‍♂️
// Esto es CRUCIAL. Usamos la SERVICE_KEY para poder leer los vectores sin restricciones de seguridad.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY 
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export const chatWithPlanMexico = async (req, res) => {
  try {
    const { pregunta, perfil_id } = req.body;

    if (!pregunta) {
      return res.status(400).json({ error: 'Por favor envía una pregunta.' });
    }

    // 2. Generar Embedding de la pregunta
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: pregunta,
    });
    
    const vectorPregunta = embeddingResponse.data[0].embedding;

    // 3. Buscar en Supabase usando el CLIENTE ADMIN
    const { data: documentos, error } = await supabaseAdmin.rpc('match_documents', {
      query_embedding: vectorPregunta,
      match_threshold: 0.3, // 👇 HE BAJADO ESTO DE 0.5 A 0.3 PARA ENCONTRAR MÁS COSAS
      match_count: 5,
    });

    if (error) {
      console.error('Error buscando documentos:', error);
      throw error;
    }

    // Diagnóstico: Ver en consola si encontró algo
    console.log(`🔎 Se encontraron ${documentos?.length || 0} fragmentos relevantes.`);

    // 4. Preparar contexto
    // Si no hay documentos, el contexto estará vacío, pero el código sigue.
    const contexto = documentos?.map(doc => doc.content).join('\n---\n') || "";

    // 5. Preguntar a ChatGPT
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5',
      messages: [
        {
          role: 'system',
          content: `Eres el asistente virtual oficial del "Plan México".

          Tu objetivo es responder preguntas ciudadanas basándote PRINCIPALMENTE en el siguiente contexto.

          Si la respuesta no está en el contexto, responde amablemente que no tienes información específica dentro del Plan México, pero ofrece orientación general aclarando explícitamente que dicha información NO es oficial.

          — ESTILO Y EXTENSIÓN:
          Responde de forma clara, breve y concisa por defecto.
          Solo extiende la respuesta si el contexto o la complejidad de la pregunta lo requieren.
          Evita párrafos innecesariamente largos y mantén un lenguaje sencillo y directo.

          — TONO:
          Profesional, cálido, amigable y ciudadano.
          Evita tecnicismos a menos que sean necesarios.

          — INTERACCIÓN FINAL (obligatoria):
          Después de contestar la pregunta del usuario, finaliza SIEMPRE con una pregunta corta para generar interacción y personalización.
          Puedes elegir entre preguntas como:
          • “¿A qué te dedicas actualmente?”
          • “¿En qué estado de México te encuentras?”
          • “¿Qué parte del Plan México te gustaría conocer mejor?”
          • “¿Hay algo de tu vida diaria donde crees que el Plan México podría ayudarte?”

          El objetivo es:
          1. Conectar con el ciudadano.
          2. Comprender su situación personal.
          3. Explicar cómo el Plan México puede relacionarse con él.
          4. Mantener la conversación activa.

          — CONTEXTO OFICIAL DEL PLAN MÉXICO:
          ${contexto}`
        },
        { role: "user", content: pregunta }
      ],
      temperature: 0.3,
    });



    const respuestaIA = chatResponse.choices[0].message.content;

    // 6. Guardar en historial (Usando también el cliente Admin para asegurar permisos)
    if (perfil_id) {
      const { error: errorGuardado } = await supabaseAdmin
        .from('Chat_historial')
        .insert([
          {
            perfil_id: perfil_id,
            mensaje_usuario: pregunta,
            respuesta_ia: respuestaIA
          }
        ]);

      if (errorGuardado) console.error('Error al guardar historial:', errorGuardado);
    }

    res.status(200).json({ 
      respuesta: respuestaIA,
      fuentes: documentos // Ahora deberías ver contenido aquí
    });

  } catch (error) {
    console.error('Error en el chat:', error);
    res.status(500).json({ error: 'Hubo un error al procesar tu consulta.' });
  }
};