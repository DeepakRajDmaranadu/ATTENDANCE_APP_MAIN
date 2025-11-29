import express from 'express'
import { login, register } from '../controllers/authController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get('/profile',verifyToken,(req,res)=>{
    res.json({
        message:"Protected user data",
        user:req.user
    })
})

export default router;