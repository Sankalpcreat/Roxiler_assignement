# Roxiler Assignment

## About The Project

This is a full-stack web application for transaction data analysis and visualization. The project consists of a React frontend and Node.js backend that work together to provide various features for analyzing transaction data.

## Architecture Diagram

![Architecture Diagram](/frontend/public/image.png)

### Key Features
- Transaction data display with search and pagination
- Monthly statistics including total sale amount, total sold items, and not sold items
- Bar chart visualization of price range distribution
- Combined data API for efficient data fetching
- Responsive and modern UI design

### Core Functionality
- **Transaction Management**: View and search through transaction data
- **Statistical Analysis**: Get monthly statistics of sales and items
- **Data Visualization**: Interactive bar charts for price range analysis
- **Month-based Filtering**: All data can be filtered by selecting different months

This repository contains both the frontend and backend components of the Roxiler assignment project.


## Frontend

The frontend is built using modern web technologies:
- React with Vite as the build tool
- TailwindCSS for styling
- ESLint for code quality

### Frontend Structure
- `src/`: Contains the main React application code
- `public/`: Static assets
- `index.html`: Entry point HTML file
- `vite.config.js`: Vite configuration
- `tailwind.config.js`: TailwindCSS configuration
- `eslint.config.js`: ESLint configuration

## Backend

The backend is built using Node.js with Express:

### Backend Structure
- `config/`: Configuration files
- `controllers/`: Request handlers and business logic
- `models/`: Database models and schemas
- `routes/`: API route definitions
- `server.js`: Main application entry point

## Getting Started

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add necessary environment variables
4. Start the server:
```bash
npm start
```

## Environment Variables

### Backend
Create a `.env` file in the backend directory with the following variables:
- Database connection string(MONGO_URI)¯
- Port number(PORT)¯
- 

## Available Scripts

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint

### Backend
- `npm start`: Start the server
- `npm run dev`: Start with nodemon for development

## Technologies Used

### Frontend
- React
- Vite
- TailwindCSS
- ESLint

### Backend
- Node.js
- Express.js
- MongoDB (assumed based on structure)
- Environment variables for configuration
