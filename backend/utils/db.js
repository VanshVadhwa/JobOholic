import mongoose from "mongoose";

const connectDatabase = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.error("Failed connecting to MongoDB: ", error);
        process.exit(1); // 1 means failure and 0 means success
    }
}

export default connectDatabase;