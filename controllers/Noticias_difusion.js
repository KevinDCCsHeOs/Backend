// Noticias_difusion.js
import supabase from '../supabaseClient.js';

const TABLE_NAME = 'Noticias_difusion';

// Crear noticia de difusión
export const createNoticiaDifusion = async (req, res) => {
  try {
    const datos = req.body;

    // Campos obligatorios
    if (!datos.titulo || !datos.contenido || !datos.tipo_medio) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (titulo, contenido, tipo_medio)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          titulo: datos.titulo,
          contenido: datos.contenido,
          tipo_medio: datos.tipo_medio,
          url_medio: datos.url_medio || null,
          etiquetas: datos.etiquetas || null,      // puedes mandar string o tags separados por comas
          publicada_en: datos.publicada_en || null, // date/timestamp
          es_emergente: datos.es_emergente ?? false, // bool
          subtitulo: datos.subtitulo || null,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Noticia de difusión creada correctamente',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las noticias de difusión
// opcional: ?es_emergente=true / ?es_emergente=false
export const getNoticiasDifusion = async (req, res) => {
  try {
    const { es_emergente } = req.query;

    let query = supabase.from(TABLE_NAME).select('*');

    if (es_emergente !== undefined) {
      const flag = es_emergente === 'true';
      query = query.eq('es_emergente', flag);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una noticia por ID
export const getNoticiaDifusionById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Noticia de difusión no encontrada' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar noticia de difusión
export const updateNoticiaDifusion = async (req, res) => {
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
        error: 'Noticia de difusión no encontrada para actualizar',
      });
    }

    res.status(200).json({
      message: 'Noticia de difusión actualizada',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar noticia de difusión
export const deleteNoticiaDifusion = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;

    res.status(200).json({
      message: `Noticia de difusión con ID ${id} eliminada`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
