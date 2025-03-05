const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('QR Ordering System Backend');
});
const menuRoutes = require('./routes/routes.menuRoutes');
const orderRoutes = require('./routes/routes.orderRoutes');

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});