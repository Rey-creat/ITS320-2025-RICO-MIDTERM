import e from 'express';
import { createUser } from '../controller/userController.js';

export const router = e.Router();

router.post('/create', createUser);

router.get('/', (req, res) => {
    res.send('Hello from User routes')
})