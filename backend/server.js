require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const chartRoutes = require('./routes/chartRoutes');
const combinedRoutes = require('./routes/combinedRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', transactionRoutes);
app.use('/api', statisticsRoutes);
app.use('/api', chartRoutes);
app.use('/api', combinedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));