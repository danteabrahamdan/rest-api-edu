const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


const app = express();
app.use(cors());
dbConnection();
// TODO borrar
app.get('/', (req, res) => {
  res.status(200).json({ ok: true, msg: 'Express correcto' });
});
app.listen(process.env.PORT, () => console.log(`Servidor en el puerto ${process.env.PORT}`));