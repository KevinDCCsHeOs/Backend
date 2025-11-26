// Campanias_difusion.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Campanias_difusion';

// Crear campaña
export const createCampania = async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.nombre || !datos.fecha_inicio || !datos.fecha_fin) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (nombre, fecha_inicio, fecha_fin)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          nombre: datos.nombre,
          fecha_inicio: datos.fecha_inicio, // string/Date ISO
          fecha_fin: datos.fecha_fin,
          clon_geo: datos.clon_geo || null,
          estado_logistico: datos.estado_logistico || 'planeada',
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Campaña de difusión creada correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las campañas
export const getCampanias = async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener campaña por ID
export const getCampaniaById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar campaña
export const updateCampania = async (req, res) => {
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
      return res
        .status(404)
        .json({ error: 'Campaña no encontrada para actualizar' });
    }

    res.status(200).json({
      message: 'Campaña de difusión actualizada',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar campaña
export const deleteCampania = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res
      .status(200)
      .json({ message: `Campaña de difusión con ID ${id} eliminada` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
