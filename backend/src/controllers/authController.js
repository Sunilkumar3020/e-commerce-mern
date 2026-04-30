import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

// Register user

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        // validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please field required fields" })
        }
        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10)

        // create user
        const user = await User.create({
            name,
            email,
            password
        })

        // Generate cookie token
        generateToken(res, user._id)

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

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // find user
        const user = await User.findOne({ email });

        // check user + password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // Generate token
        generateToken(res, user._id);

        //send safe response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// logout user
export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged out successfully" })
}