// Proyectos_construccion.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Proyectos_construccion';

// Crear proyecto de construcción
export const createProyectoConstruccion = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.polo_id || !datos.nombre) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (polo_id, nombre)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          polo_id: datos.polo_id,
          nombre: datos.nombre,
          coordenadas_ar: datos.coordenadas_ar || {}, // json
          modelo_ar_url: datos.modelo_ar_url || null, // varchar
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Proyecto de construcción creado correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los proyectos de construcción
// opcional: filtrar por polo_id ?polo_id=123
export const getProyectosConstruccion = async (req, res) => {
  try {
    const { polo_id } = req.query;

    let query = supabase.from(TABLE_NAME).select('*');

    if (polo_id) {
      query = query.eq('polo_id', polo_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un proyecto por ID
export const getProyectoConstruccionById = async (req, res) => {
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
        .json({ error: 'Proyecto de construcción no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar proyecto de construcción
export const updateProyectoConstruccion = async (req, res) => {
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
        error: 'Proyecto de construcción no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Proyecto de construcción actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar proyecto de construcción
export const deleteProyectoConstruccion = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Proyecto de construcción con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
