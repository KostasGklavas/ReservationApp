const db = require('../services/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashed]);
    res.status(201).send({ message: "Εγγραφή επιτυχής" });
  } catch (err) {
    res.status(400).send({ error: "Το email χρησιμοποιείται ήδη." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!users.length) return res.status(401).send({ error: "Λανθασμένα στοιχεία" });
  const user = users[0];
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.user_id }, jwtSecret, { expiresIn: "2h" });
    res.send({ token });
  } else {
    res.status(401).send({ error: "Λανθασμένα στοιχεία" });
  }
};

exports.getUserReservations = async (req, res) => {
  const userId = req.user.id;
  const [reservations] = await db.query(`
    SELECT r.*, res.name AS restaurant_name 
    FROM reservations r
    JOIN restaurants res ON r.restaurant_id = res.restaurant_id
    WHERE r.user_id = ?`, [userId]);
  res.send(reservations);
};
