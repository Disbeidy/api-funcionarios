const express = require('express');
const pool = require('../config/db');
const { verificarToken, soloAdmin } = require('../middleware/auth');
const router = express.Router();

// CRUD de marcas (solo admin)
router.post('/marcas', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    await pool.query('INSERT INTO marcas (nombre) VALUES (?)', [nombre]);
    res.json({ message: 'Marca creada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear marca' });
  }
});

router.get('/marcas', verificarToken, soloAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM marcas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar marcas' });
  }
});

router.put('/marcas/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const [result] = await pool.query('UPDATE marcas SET nombre=? WHERE id=?', [nombre, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Marca no encontrada' });

    res.json({ message: 'Marca actualizada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar marca' });
  }
});

router.delete('/marcas/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM marcas WHERE id=?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Marca no encontrada' });

    res.json({ message: 'Marca eliminada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar marca' });
  }
});

module.exports = router;