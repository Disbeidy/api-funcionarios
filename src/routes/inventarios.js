const express = require('express');
const pool = require('../config/db');
const { verificarToken, authRole, soloAdmin } = require('../middleware/auth');
const router = express.Router();

// Crear inventario (solo admin)
router.post('/inventarios', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    await pool.query('INSERT INTO inventarios (nombre) VALUES (?)', [nombre]);
    res.json({ message: 'Inventario creado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear inventario' });
  }
});

// Listar inventarios (admin y docente)
router.get('/inventarios', verificarToken, authRole(['admin','docente']), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventarios');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar inventarios' });
  }
});

// Editar inventario (solo admin)
router.put('/inventarios/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    const [result] = await pool.query('UPDATE inventarios SET nombre=? WHERE id=?', [nombre, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Inventario no encontrado' });

    res.json({ message: 'Inventario actualizado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar inventario' });
  }
});

// Eliminar inventario (solo admin)
router.delete('/inventarios/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM inventarios WHERE id=?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Inventario no encontrado' });

    res.json({ message: 'Inventario eliminado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar inventario' });
  }
});

module.exports = router;