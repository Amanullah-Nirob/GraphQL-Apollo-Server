import mongoose from 'mongoose'
import Dotenv from 'dotenv';
Dotenv.config()

const connectToMongoDB=async()=>{
   try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`🔥 Connected to MongoDB cluster`);
   } catch (error) {
    console.log(`❌ MongoDB connection error : ${error.message}`);
    process.exit(1);
   }
}

export default connectToMongoDB;