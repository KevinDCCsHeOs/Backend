import fs from 'fs';
import pdf from 'pdf-extraction';
import dotenv from 'dotenv'; // Recuerda que ya instalamos esto
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const NOMBRE_ARCHIVO = 'Plan_Mexico_PrimerBorrador.pdf'; // <--- ¡Aquí está tu archivo!

// Función para dividir el texto en pedazos (chunks)
const dividirTexto = (texto, tamanoChunk = 1000, overlap = 200) => {
  const chunks = [];
  let index = 0;

  while (index < texto.length) {
    // Cortamos desde el índice actual hasta el tamaño del chunk
    const chunk = texto.slice(index, index + tamanoChunk);
    chunks.push(chunk);
    
    // Avanzamos, pero restando el overlap para que haya solapamiento
    index += (tamanoChunk - overlap);
  }
  
  return chunks;
};

const procesarDocumento = async () => {
  try {
    // Verificamos que el archivo exista antes de intentar leerlo
    if (!fs.existsSync(NOMBRE_ARCHIVO)) {
      console.error(`❌ Error: No encuentro el archivo "${NOMBRE_ARCHIVO}" en la carpeta actual.`);
      return;
    }

    console.log(`📖 Leyendo el archivo: ${NOMBRE_ARCHIVO}...`);
    
    const bufferDatos = fs.readFileSync(NOMBRE_ARCHIVO);
    const data = await pdf(bufferDatos);
    const textoCompleto = data.text;

    console.log(`✅ ¡Éxito! Texto extraído correctly.`);

    console.log("✂️ Dividiendo el texto en chunks...");
    const fragmentos = dividirTexto(textoCompleto);
    
    console.log(`🧩 Se generaron ${fragmentos.length} fragmentos.`);
    console.log(`🔎 Muestra del primer fragmento: \n"${fragmentos[0].slice(0, 100)}..."`);
    await guardarDatos(fragmentos);
    
    // Aquí es donde agregaremos el siguiente paso (dividir el texto)

  } catch (error) {
    console.error("❌ Ocurrió un error inesperado:", error);
  }
};

const guardarDatos = async (chunks) => {
  console.log(`💾 Comenzando la carga de ${chunks.length} fragmentos a Supabase...`);

  // Usamos un bucle for...of para procesarlos uno por uno y no saturar la API
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    try {
      // 1. Generar Embedding (Convertir texto a números)
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small', // Debe coincidir con las 1536 dimensiones de tu tabla
        input: chunk,
      });
      
      const vector = embeddingResponse.data[0].embedding;

      // 2. Guardar en Supabase
      // ⚠️ Asegúrate de que 'Documentos_conocimiento' y 'contenido' sean los nombres exactos en tu BD
      const { error } = await supabase
        .from('Documentos_conocimiento') 
        .insert({
          contenido: chunk, 
          embedding: vector
        });

      if (error) {
        throw new Error(`Error Supabase: ${error.message}`);
      }
      
      console.log(`✅ Fragmento ${i + 1}/${chunks.length} guardado.`);

    } catch (err) {
      console.error(`❌ Error en fragmento ${i + 1}:`, err.message);
    }
  }
  
  console.log("🎉 ¡Carga completa! Tu IA ya tiene memoria del Plan México.");
};

procesarDocumento();