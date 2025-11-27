import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validación de seguridad para que sepas si falta algo en el .env
if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Faltan las variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase conectado en el Frontend");