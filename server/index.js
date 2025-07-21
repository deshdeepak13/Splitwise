import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';

dotenv.config();

import authRoutes from './src/routes/authRoutes.js';
import friendRoutes from './src/routes/friendRoutes.js';
import expenseRoutes from './src/routes/expenseRoutes.js'
import userRoutes from './src/routes/userRoutes.js';

// Load env variables
 
// Connect DB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // ✅ Auth route
app.use('/api/friends', friendRoutes); 
app.use('/api/expenses', expenseRoutes); 
app.use('/api/users', userRoutes); 

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to SplitPe...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
