const express = require('express');
const usuarios = require('./routes/usuarios');
const auth = require('./routes/auth');
const inventarios = require('./routes/inventarios');

const app = express();
app.use(express.json());

app.use('/api', usuarios);
app.use('/api', auth);
app.use('/api', inventarios);

app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));
