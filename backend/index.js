import cors from 'cors';
import express, { json } from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import { router as quoteRoutes } from './routes/quoteRoutes.js';
import { router as userRouter } from './routes/userRoutes.js';
import { router as todolistRoutes } from './routes/todolistRoutes.js';

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(json());

connectDB();

app.use('/api/users', userRouter);
app.use('/api/quotes', quoteRoutes);
app.use('/api/todolist', todolistRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/Hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Active on port ${port}`);
});
