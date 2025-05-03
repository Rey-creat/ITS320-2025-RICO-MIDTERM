import mongoose from 'mongoose'; // Import mongoose

// Create a new schema
const todolistSchema =  mongoose.Schema({
    todolist: {
        type: String,
        required: [true, 'Please provide a todolist'] // Set field as required
    },
    title: {
        type: String,
        required: [true, 'Please provide an title'] // Set field as required
    }
});

const Todolist = mongoose.model('Todolist', todolistSchema);
// Export the schema
export default Todolist;