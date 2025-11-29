import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL = process.env.MONGO_URL
const connectDB = () => {
    try {
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("mongodb connected successfully.....")
        })
    } catch (error) {
        console.log("error::", error)
    }

}
export default connectDB