// Embajadores_log.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Embajadores_log';

// Crear registro de acción de embajador
export const createEmbajadorLog = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.perfil_id || !datos.tipo_accion) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (perfil_id, tipo_accion)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          perfil_id: datos.perfil_id,
          tipo_accion: datos.tipo_accion,
          evidencia_url: datos.evidencia_url || null,
          puntos_ganados: datos.puntos_ganados || 0,
          validado: datos.validado ?? false, // si no viene, false
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Acción de embajador registrada correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los registros
export const getEmbajadoresLog = async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener registros por perfil_id
export const getEmbajadoresLogByPerfil = async (req, res) => {
  try {
    const { perfil_id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('perfil_id', perfil_id);

    if (error) throw error;

    res.status(200).json(data); // puede regresar muchos registros
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro por ID
export const getEmbajadorLogById = async (req, res) => {
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
        .json({ error: 'Registro de embajador no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar registro
export const updateEmbajadorLog = async (req, res) => {
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
        error: 'Registro de embajador no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Registro de embajador actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar registro
export const deleteEmbajadorLog = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Registro de embajador con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
