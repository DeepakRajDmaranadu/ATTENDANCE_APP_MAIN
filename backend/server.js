import express from 'express'
import dotenv from 'dotenv'
const app=express()
import mongoose from 'mongoose'
import connectDB from './config/connectdb.js'
import authRoutes from './routes/authRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'

const PORT=process.env.PORT || 6000
// MongoDB connection
connectDB()

// APIs

app.use(express.json());
app.use('/auth',authRoutes)
app.use('/subject',subjectRoutes)


// Server connection
app.listen(PORT,()=>{
    console.log("Server Started...",PORT)
})

