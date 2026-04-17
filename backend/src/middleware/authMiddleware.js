import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
//Protect routes (require login)

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        // check token exists
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" })
        }

        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // get user (exclude password)
        const user = await User.findById(decoded)

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        // Attach user to request
        req.user = user;
        next()
    } catch (error) {
        // Token expired or invalid 
        return res.status(401).json({
            message: "Not authorized, token failed"
        })
    }
}