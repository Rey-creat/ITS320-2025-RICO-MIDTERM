import mongoose from 'mongoose'; // Import mongoose

// Create a new schema
const quoteSchema =  mongoose.Schema({
    quotes: {
        type: String,
        required: [true, 'Please provide a quote'] // Set field as required
    },
    author: {
        type: String,
        required: [true, 'Please provide an author'] // Set field as required
    },
    published: {
        type: String,
        required: [true, 'Please provide a published date'] // Set field as required
    },
    title: {
        type: String,
        required: [true, 'Please provide a title']
    }
});

const Quote = mongoose.model('Quote', quoteSchema);
// Export the schema
export default Quote;