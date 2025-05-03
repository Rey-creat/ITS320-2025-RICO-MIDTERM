import Quote from '../models/quoteModel.js';

async function getQuotes(req, res) {
    try {
        const quotes = await Quote.find();

        if (quotes.length > 0) {
            return res.status(200).json(quotes);
        } else {
            return res.status(404).json({ message: "No quotes yet." });
        }
    } catch (error) {
        console.error("Error getting todolist", error);
return res.status(500).json({
    message: "Something went wrong while getting the todolist"
});

    }
}

function createQuote(req, res) {
    const { quotes, author, published, title } = req.body;

    if (!quotes || !author || !published || !title) {
        return res.status(400).send('Please fill out all fields.');
    }

    Quote.create({ quotes, author, published, title })
        .then(() => res.status(200).send('Todolist Successfully created.'))
        .catch(error => res.status(500).send('Error while creating User: ' + error.message));
}

const quotesController = {createQuote, getQuotes}
export default quotesController;