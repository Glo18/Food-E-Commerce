const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);

// Testing the API route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
