// Returns total sale, total sold items, total not sold items for selected month

const Transaction = require('../models/Transaction');

const getMonthNumber = (monthName) => {
  return new Date(`${monthName} 1, 2022`).getMonth() + 1;
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthNumber = getMonthNumber(month);

  try {
    const matchStage = {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
      }
    };

    const totalSaleResult = await Transaction.aggregate([
      matchStage,
      { $match: { sold: true } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const soldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: true
    });

    const notSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: false
    });

    const totalSale = totalSaleResult[0]?.total || 0;

    res.status(200).json({
      totalSale,
      soldItems,
      notSoldItems
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get statistics', details: error.message });
  }
};