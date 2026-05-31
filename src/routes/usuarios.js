const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();

// Crear usuario
router.post('/usuarios', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  if (!['admin','docente'].includes(rol)) {
    return res.status(400).json({ error: 'Rol inválido' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)',
    [nombre, email, hashedPassword, rol]
  );
  res.json({ message: 'Usuario creado con éxito' });
});

// Listar usuarios
router.get('/usuarios', async (req, res) => {
  const [rows] = await pool.query('SELECT id, nombre, email, rol FROM usuarios');
  res.json(rows);
});

module.exports = router;
