const express = require('express');
const pool = require('../config/db');
const { verificarToken, soloAdmin } = require('../middleware/auth');
const router = express.Router();

// Crear estado (solo admin)
router.post('/estados', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    await pool.query('INSERT INTO estados (nombre) VALUES (?)', [nombre]);
    res.json({ message: 'Estado creado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear estado' });
  }
});

// Listar estados (solo admin)
router.get('/estados', verificarToken, soloAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM estados');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar estados' });
  }
});

// Editar estado (solo admin)
router.put('/estados/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    const [result] = await pool.query('UPDATE estados SET nombre=? WHERE id=?', [nombre, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Estado no encontrado' });

    res.json({ message: 'Estado actualizado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

// Eliminar estado (solo admin)
router.delete('/estados/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM estados WHERE id=?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Estado no encontrado' });

    res.json({ message: 'Estado eliminado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar estado' });
  }
});

module.exports = router;