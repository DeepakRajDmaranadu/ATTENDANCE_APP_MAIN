import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedpassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password:hashedpassword })
        await newUser.save()
        console.log("user :",newUser)
        res.status(200).json({ message: "added successfully" })
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Username already exists! Please choose another." });
        }
        else {
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
}
export const login = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const ispasswordmatch=await bcrypt.compare(password,user.password)
        if(!ispasswordmatch){
            return res.status(400).json({message:"Invalid password.."})
        }

        // generate jwt webtoken
        const token=jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.status(200).json(
            {
                message:"Login Successful",
                token,
                user:{
                    id:user._id,
                    email:user.email,
                    createdAt:user.createdAt
                }
            }
        )


    } catch (error) {
        res.status(500).json({message:"Something went wrong..."})
    }
}