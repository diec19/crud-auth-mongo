import app from "./app.js"
import { connectDB } from "./db.js"
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 9001
connectDB()
app.listen(port)
console.log("se esta ejectando enelpuerto 9000")