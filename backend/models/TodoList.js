import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  items: [
    {
      text: { type: String },
      completed: { type: Boolean, default: false }
    }
  ]
});

const TodoList = mongoose.model('TodoList', todoListSchema);

export default TodoList;
