import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Connection to database failed", error);
        process.exit(1);
    }
};

export default connectDb