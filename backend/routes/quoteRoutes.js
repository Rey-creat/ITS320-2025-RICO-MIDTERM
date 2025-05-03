import e from 'express';
import quotesController from '../controller/quoteController.js';

export const router = e.Router();

router.post('/create', quotesController.createQuote); // POST /api/quotes/create
router.get('/get', quotesController.getQuotes);       // GET /api/quotes/get
