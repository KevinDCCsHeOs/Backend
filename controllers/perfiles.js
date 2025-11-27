import supabase from '../supabaseClient.js'; 

const TABLE_NAME = 'Perfiles';

// Crear perfil
export const createPerfil = async (req, res) => { 
  try {
    const datos = req.body;

    if (!datos.curp || !datos.nombre || !datos.tipo_usuario || !datos.tipo_persona) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios (CURP, Nombre, Tipo de Usuario, Tipo de Persona)',
      });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          curp: datos.curp,
          nombre: datos.nombre,
          tipo_usuario: datos.tipo_usuario,
          tipo_persona: datos.tipo_persona,
          region_interes: datos.region_interes,
          temas_interes: datos.temas_interes,
          embajador_nivel: datos.nivel_embajador,
          puntos_recompensa: datos.puntos_recompensa || 0,
          email: datos.email,
          telefono: datos.telefono,
          contrasenia: datos.contrasenia,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Perfil creado exitosamente',
      data: data[0],
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los perfiles
export const getPerfiles = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un perfil por ID
export const getPerfilById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión
export const loginPerfil = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!data || data.contrasenia !== contrasenia) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.status(200).json({ 
      message: 'Login exitoso', 
      user: data 
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar perfil
export const updatePerfil = async (req, res) => {
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
        error: 'Perfil no encontrado para actualizar',
      });
    }

    res.status(200).json({
      message: 'Perfil actualizado',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar perfil
export const deletePerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({
      message: `Perfil con ID ${id} eliminado`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
