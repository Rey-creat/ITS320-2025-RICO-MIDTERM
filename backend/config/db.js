import { connect } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
    try {
        const conn = await connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected to ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);  // Exit the process if connection fails
    }
}

export default connectDB;
