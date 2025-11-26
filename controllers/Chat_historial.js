// Chat_historial.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Chat_historial';

// Crear registro de chat
export const createChatHistorial = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.perfil_id || !datos.mensaje_usuario || !datos.respuesta_ia) {
      return res.status(400).json({
        error:
          'Faltan datos obligatorios (perfil_id, mensaje_usuario, respuesta_ia)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          perfil_id: datos.perfil_id,
          mensaje_usuario: datos.mensaje_usuario,
          respuesta_ia: datos.respuesta_ia,
          feedback: datos.feedback ?? null, // puede venir true/false o null
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Interacción de chat registrada correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los registros de chat
export const getChatHistorial = async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todo el chat de un perfil (opcional pero útil)
export const getChatHistorialByPerfil = async (req, res) => {
  try {
    const { perfil_id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('perfil_id', perfil_id);

    if (error) throw error;

    res.status(200).json(data); // pueden ser muchos registros
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro de chat por ID
export const getChatHistorialById = async (req, res) => {
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
        .json({ error: 'Registro de chat no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar registro de chat
export const updateChatHistorial = async (req, res) => {
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
        error: 'Registro de chat no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Registro de chat actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar registro de chat
export const deleteChatHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Registro de chat con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
