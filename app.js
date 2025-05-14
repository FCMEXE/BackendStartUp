
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

app.use(express.json());


app.use('/api/gerentes', require('./routes/gerenteRoutes'));
app.use('/api/colaboradores', require('./routes/colaboradorRoutes'));
app.use('/api/rotas', require('./routes/rotaRoutes'));



module.exports = app;
