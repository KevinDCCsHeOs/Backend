// Polos_desarrollo.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Polos_desarrollo';

// Crear polo de desarrollo
export const createPoloDesarrollo = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.nombre || !datos.ubicacion) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (nombre, ubicacion)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          nombre: datos.nombre,
          descripcion: datos.descripcion || '',
          ubicacion: datos.ubicacion,
          vocacion_economica: datos.vocacion_economica || null,
          inversion_estimada: datos.inversion_estimada ?? null,   // numeric
          empleos_proyectados: datos.empleos_proyectados ?? null, // int4
          modelo_3d_url: datos.modelo_3d_url || null,
          datos_extra: datos.datos_extra || {},                   // json
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Polo de desarrollo creado correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los polos de desarrollo
export const getPolosDesarrollo = async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un polo de desarrollo por ID
export const getPoloDesarrolloById = async (req, res) => {
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
        .json({ error: 'Polo de desarrollo no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar polo de desarrollo
export const updatePoloDesarrollo = async (req, res) => {
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
        error: 'Polo de desarrollo no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Polo de desarrollo actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar polo de desarrollo
export const deletePoloDesarrollo = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Polo de desarrollo con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
