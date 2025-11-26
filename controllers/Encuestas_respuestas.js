// Encuestas_respuestas.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Encuestas_respuestas';

// Crear registro de encuesta_respuesta
export const createEncuestaRespuesta = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.perfil_id || !datos.respuestas) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (perfil_id, respuestas)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          perfil_id: datos.perfil_id,
          respuestas: datos.respuestas,        // jsonb
          origen: datos.origen || null,
          ip_hash: datos.ip_hash || null,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Encuesta_respuesta creada correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las encuestas_respuestas
export const getEncuestasRespuestas = async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las respuestas de un perfil
export const getEncuestasByPerfil = async (req, res) => {
  try {
    const { perfil_id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('perfil_id', perfil_id);

    if (error) throw error;

    res.status(200).json(data); // puede haber muchas
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una respuesta de encuesta por ID
export const getEncuestaRespuestaById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res
        .status(404)
        .json({ error: 'Encuesta_respuesta no encontrada' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar respuesta de encuesta
export const updateEncuestaRespuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        error: 'Encuesta_respuesta no encontrada para actualizar',
      });
    }

    res.status(200).json({
      message: 'Encuesta_respuesta actualizada',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar respuesta de encuesta
export const deleteEncuestaRespuesta = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Encuesta_respuesta con ID ${id} eliminada`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
