
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully:", conn.connection.host);
    } catch (err) {
        console.error(`Could Not Connect To MongoDB: ${err.message}`);
        throw err;
    }
};

module.exports = connectDB;
