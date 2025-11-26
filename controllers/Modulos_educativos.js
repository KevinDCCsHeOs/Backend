import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Modulos_educativos';

// Crear módulo educativo
export const createModuloEducativo = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.titulo || !datos.audiencia) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (titulo, audiencia)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          titulo: datos.titulo,
          audiencia: datos.audiencia,
          contenido_json: datos.contenido_json || {}, // jsonb
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Módulo educativo creado correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los módulos educativos
export const getModulosEducativos = async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un módulo educativo por ID
export const getModuloEducativoById = async (req, res) => {
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
        .json({ error: 'Módulo educativo no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar módulo educativo
export const updateModuloEducativo = async (req, res) => {
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
        error: 'Módulo educativo no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Módulo educativo actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar módulo educativo
export const deleteModuloEducativo = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Módulo educativo con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
