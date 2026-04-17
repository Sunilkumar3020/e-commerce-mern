import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    res.cookie("token", token, {
        httpOnly: true, // prevents XSS attacks
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });
}

export default generateToken;