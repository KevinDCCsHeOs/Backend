// Documentos_conocimiento.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Documentos_conocimiento';

// Crear documento de conocimiento
export const createDocumentoConocimiento = async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.contenido) {
      return res
        .status(400)
        .json({ error: 'Falta el contenido del documento' });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          contenido: datos.contenido,           // texto base
          metadatos: datos.metadatos || {},     // jsonb
          embedding: datos.embedding || null,   // puede ser string o vector
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Documento de conocimiento creado correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los documentos
export const getDocumentosConocimiento = async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un documento por ID
export const getDocumentoConocimientoById = async (req, res) => {
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
        .json({ error: 'Documento de conocimiento no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar documento
export const updateDocumentoConocimiento = async (req, res) => {
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
        error: 'Documento de conocimiento no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Documento de conocimiento actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar documento
export const deleteDocumentoConocimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Documento de conocimiento con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
