const express = require('express');
const router = express.Router();
const db = require('../services/db');
const auth = require('../middleware/auth');

// Create Reservation
router.post('/', auth, async (req, res) => {
  const { restaurant_id, date, time, people_count } = req.body;
  const user_id = req.user.id;
  await db.query(
    "INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)",
    [user_id, restaurant_id, date, time, people_count]
  );
  res.send({ message: "Κράτηση επιτυχής" });
});

// Update Reservation
router.put('/:id', auth, async (req, res) => {
  const { date, time, people_count } = req.body;
  const user_id = req.user.id;
  const reservation_id = req.params.id;
  await db.query(
    "UPDATE reservations SET date=?, time=?, people_count=? WHERE reservation_id=? AND user_id=?",
    [date, time, people_count, reservation_id, user_id]
  );
  res.send({ message: "Ενημέρωση κράτησης επιτυχής" });
});

// Delete Reservation
router.delete('/:id', auth, async (req, res) => {
  const user_id = req.user.id;
  const reservation_id = req.params.id;
  await db.query("DELETE FROM reservations WHERE reservation_id=? AND user_id=?", [reservation_id, user_id]);
  res.send({ message: "Διαγραφή κράτησης επιτυχής" });
});

module.exports = router;
