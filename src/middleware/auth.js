const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware para verificar que el token JWT sea válido
 */
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar datos del usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

/**
 * Middleware para permitir acceso solo a roles específicos
 * @param {Array} roles - Lista de roles permitidos (ej. ['admin'])
 */
function authRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' });
    }
    next();
  };
}

/**
 * Middleware específico para administradores
 */
function soloAdmin(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
  }
  next();
}

/**
 * Middleware específico para docentes
 */
function soloDocente(req, res, next) {
  if (req.user.rol !== 'docente') {
    return res.status(403).json({ error: 'Acceso denegado: solo docentes' });
  }
  next();
}

module.exports = { verificarToken, authRole, soloAdmin, soloDocente };
