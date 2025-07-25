import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import loanRoutes from './routes/loanRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/loan', authMiddleware, loanRoutes); 

app.get('/', (req, res) => {
  res.send('Loan Manager API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
