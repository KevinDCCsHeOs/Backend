// foro_comentarios.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'foro_comentarios';

// Crear comentario en el foro
export const createForoComentario = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.tema_id || !datos.perfil_id || !datos.texto) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (tema_id, perfil_id, texto)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          tema_id: datos.tema_id,
          perfil_id: datos.perfil_id,
          texto: datos.texto,
          sentimiento: datos.sentimiento ?? null, // float
          moderado: datos.moderado ?? false,      // bool
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Comentario creado correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener comentarios (opcionalmente filtrados por tema_id)
export const getForoComentarios = async (req, res) => {
  try {
    const { tema_id } = req.query;

    let query = supabase.from(TABLE_NAME).select('*');

    // Si mandas ?tema_id=123 en la URL, filtra por ese tema
    if (tema_id) {
      query = query.eq('tema_id', tema_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un comentario por ID
export const getForoComentarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar comentario
export const updateForoComentario = async (req, res) => {
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
        error: 'Comentario no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Comentario actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar comentario
export const deleteForoComentario = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Comentario con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
