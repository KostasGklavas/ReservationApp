const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/reservations', reservationRoutes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
