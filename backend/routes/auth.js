const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { SECRET } = require('../middleware/authRole');

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

module.exports = router;
