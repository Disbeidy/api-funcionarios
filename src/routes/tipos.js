const express = require('express');
const pool = require('../config/db');
const { verificarToken, soloAdmin } = require('../middleware/auth');
const router = express.Router();

// CRUD de tipos de equipos (solo admin)
router.post('/tipos', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    await pool.query('INSERT INTO tipos (nombre) VALUES (?)', [nombre]);
    res.json({ message: 'Tipo de equipo creado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tipo de equipo' });
  }
});

router.get('/tipos', verificarToken, soloAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tipos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar tipos de equipos' });
  }
});

router.put('/tipos/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const [result] = await pool.query('UPDATE tipos SET nombre=? WHERE id=?', [nombre, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tipo de equipo no encontrado' });

    res.json({ message: 'Tipo de equipo actualizado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar tipo de equipo' });
  }
});

router.delete('/tipos/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM tipos WHERE id=?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tipo de equipo no encontrado' });

    res.json({ message: 'Tipo de equipo eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar tipo de equipo' });
  }
});

module.exports = router;