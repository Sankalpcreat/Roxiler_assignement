// Handles initializing database and listing transactions with search, pagination, and month filtering

const axios = require('axios');
const Transaction = require('../models/Transaction');

const getMonthNumber = (monthName) => {
  return new Date(`${monthName} 1, 2022`).getMonth() + 1;
};

exports.initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize database', details: error.message });
  }
};

exports.listTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
  const monthNumber = getMonthNumber(month);

  const filter = {
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    ...(search ? {
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: parseFloat(search) || -1 }
      ]
    } : {})
  };

  try {
    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    const total = await Transaction.countDocuments(filter);
    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list transactions', details: error.message });
  }
};