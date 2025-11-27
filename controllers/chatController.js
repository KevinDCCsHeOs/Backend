import OpenAI from 'openai';
import supabase from '../supabaseClient.js';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export const chatWithPlanMexico = async (req, res) => {
  try {
    // 1. Recibimos la pregunta del usuario Y el ID del perfil
    const { pregunta, perfil_id } = req.body;

    if (!pregunta) {
      return res.status(400).json({ error: 'Por favor envía una pregunta.' });
    }

    // 2. Generamos el "Embedding" de la pregunta
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small', // Debe coincidir con el que usaste para guardar los datos
      input: pregunta,
    });
    
    const vectorPregunta = embeddingResponse.data[0].embedding;

    // 3. Buscamos en Supabase usando la función RPC que creamos
    const { data: documentos, error } = await supabase.rpc('match_documents', {
      query_embedding: vectorPregunta,
      match_threshold: 0.5, // Similitud mínima (ajustable)
      match_count: 5,       // Cuántos fragmentos de texto recuperar
    });

    if (error) {
      console.error('Error buscando documentos:', error);
      throw error;
    }

    // 4. Preparamos el contexto
    const contexto = documentos.map(doc => doc.contenido).join('\n---\n');

    // 5. Enviamos todo a ChatGPT
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o', // O 'gpt-3.5-turbo' si prefieres ahorrar
      messages: [
        {
          role: 'system',
          content: `Eres un asistente virtual oficial del "Plan Mexico".

            Tu objetivo es responder preguntas ciudadanas basandote PRINCIPALMENTE en el siguiente contexto.

            Si la respuesta no esta en el contexto, responde amablemente que no tienes informacion, pero con el objetivo de ayudar, genera una respuesta basandote en los conocimientos generales que tienes
          
            Contexto del Plan México:
          ${contexto}`
        },
        { role: 'user', content: pregunta }
      ],
      temperature: 0.3, // Bajo para que sea más preciso y menos creativo
    });

    const respuestaIA = chatResponse.choices[0].message.content;

    // 6. GUARDAR EN EL HISTORIAL (Nuevo paso agregado)
    // Solo intentamos guardar si tenemos un perfil_id
    if (perfil_id) {
      const { error: errorGuardado } = await supabase
        .from('Chat_historial')
        .insert([
          {
            perfil_id: perfil_id,
            mensaje_usuario: pregunta,
            respuesta_ia: respuestaIA
            // El campo 'feedback' es opcional o false por defecto en la BD
          }
        ]);

      if (errorGuardado) {
        console.error('Error al guardar el historial:', errorGuardado);
        // No detenemos la respuesta al usuario, solo avisamos en consola
      }
    }

    // 7. Enviamos la respuesta al frontend
    res.status(200).json({ 
      respuesta: respuestaIA,
      fuentes: documentos 
    });

  } catch (error) {
    console.error('Error en el chat:', error);
    res.status(500).json({ error: 'Hubo un error al procesar tu consulta.' });
  }
};