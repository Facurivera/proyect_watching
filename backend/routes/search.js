const express = require('express');
const fs = require('fs');
const { authMiddleware, authorizeRoles } = require('../middleware/authRole');

const router = express.Router();

router.get('/', authMiddleware, authorizeRoles('basico', 'premium', 'admin'), (req, res) => {
  const { nombre, ciudad, cargo } = req.query;
  const data = JSON.parse(fs.readFileSync('./data.json'));

  let results = data;

  if (nombre) results = results.filter(d => d.nombre.toLowerCase().includes(nombre.toLowerCase()));
  if (ciudad) results = results.filter(d => d.ciudad.toLowerCase().includes(ciudad.toLowerCase()));
  if (cargo) results = results.filter(d => d.cargo.toLowerCase().includes(cargo.toLowerCase()));

  if (req.user.role === 'basico') {
    results = results.map(({ nombre, ciudad }) => ({ nombre, ciudad }));
  }

  res.json(results);
});

module.exports = router;
