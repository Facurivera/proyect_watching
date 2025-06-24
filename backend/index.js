const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

app.use(cors());
app.use(express.json());

app.use('/api/login', authRoutes);
app.use('/api/search', searchRoutes);

app.listen(3001, () => {
  console.log('Servidor backend corriendo en http://localhost:3001');
});
