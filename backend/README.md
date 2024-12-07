# Transaction Management Backend

This is the backend service for the Transaction Management System, built with Node.js, Express, and MongoDB.



## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the root directory with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Available Scripts

- Start development server:
```bash
npm run dev
```

- Start production server:
```bash
npm start
```

## API Endpoints

### Transactions
- `GET /api/transactions` - List transactions with search and pagination
- `POST /api/initialize-database` - Initialize database with seed data

### Statistics
- `GET /api/statistics` - Get monthly statistics

### Charts
- `GET /api/bar-chart` - Get bar chart data
- `GET /api/pie-chart` - Get pie chart data

### Combined Data
- `GET /api/combined-data` - Get all statistics in a single API call

## Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `cors`: Enable CORS
- `dotenv`: Environment variable management
- `axios`: HTTP client
- `nodemon`: Development server (dev dependency)

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Features

1. Database initialization with seed data
2. Transaction listing with search and pagination
3. Monthly statistics calculation
4. Bar chart and pie chart data generation
5. Combined data endpoint for all statistics



