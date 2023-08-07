import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB CONNECT...")
    } catch (error) {
        console.log(error);
        
    }

}
