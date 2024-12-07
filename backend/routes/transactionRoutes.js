const express = require('express');
const { initializeDatabase, listTransactions } = require('../controllers/transactionController');
const router = express.Router();

router.post('/initialize-database', initializeDatabase);
router.get('/transactions', listTransactions);

module.exports = router;