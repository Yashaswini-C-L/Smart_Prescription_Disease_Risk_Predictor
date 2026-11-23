const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart_prescription_db');
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    // Do not exit process in dev if mongo is not currently running locally, allowing other routes to test
    console.warn('[Database Warning] Running without active MongoDB connection or connection failed.');
  }
};

module.exports = connectDB;
