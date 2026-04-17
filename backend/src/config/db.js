import mongoose from "mongoose";

export default async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MONGODB connected successfully!")
    } catch (error) {
        console.error(error)
    }
}