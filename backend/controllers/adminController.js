import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const registerUser = async(req, res)=>{
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
          return res.status(400).json({
            success: false,
            message: "All fields are required!",
          });
        }
        const isUser = await User.findOne({ email });
        if (isUser) {
          return res.status(409).json({
            success: false,
            message: "User already exists!",
          });
        }
        const user = new User({
          fullName,
          email,
          password,
        });
        await user.save();
        const accessToken = jwt.sign(
          { _id: user._id, fullName: user.fullName, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "3600m" }
        );
        res.status(201).json({
          success: true,
          user,
          accessToken,
          message: "Successfully registered!",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error!",
        });
      }
} 

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "All fields are required!",
          });
        }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User doesn't exists!",
          });
        }
    
        if (password != user.password) {
          return res.status(401).json({
            success: false,
            message: "Invalid Password",
          });
        }
        const accessToken = jwt.sign(
          { _id: user._id, fullName: user.fullName, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "3600m" }
        );
    
        res.status(200).json({
          success: true,
          user,
          accessToken,
          message: "Successfully Logged In!",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error!",
        });
      }
}

