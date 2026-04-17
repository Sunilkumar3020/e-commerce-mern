import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

// Register user

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // validation
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please field required fields" })
        }
        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Generate cookie token


        //send response (never send password)

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}