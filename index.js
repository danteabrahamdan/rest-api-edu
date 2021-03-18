const express = require('express');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
dbConnection();
app.use(express.static('public'));
app.use('/api/usuarios', require('./routes/usuarios-routes'));
app.use('/api/hospitales', require('./routes/hospitales-routes'));
app.use('/api/medicos', require('./routes/medicos-routes'));
app.use('/api/login', require('./routes/auth-routes'));
app.use('/api/upload', require('./routes/uploads-routes'));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public/index.html')));

app.listen(process.env.PORT, () => console.log(`Servidor en el puerto ${process.env.PORT}`));