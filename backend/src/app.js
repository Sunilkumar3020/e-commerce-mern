import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import AppError from "../src/utils/appError.js";
import qs from "qs"
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    // origin: process.env.CLIENT_URL,
    origin: "http://localhost:5173",
    credentials: true
}));

// app.set("query parser", (str) => qs.parse(str))
app.set("query parser", "extended")
console.log("REQ")
app.get('/', (req, res, next) => {
    // res.send("Hello")
    // const err = new Error("Can't find url");
    // err.status = "fail",
    //     err.statusCode = 404;
    next(new AppError("Failed"))
})

//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/products', productRoutes)

// Global Error handler (IMPORTANT)

app.use((err, req, res, next) => {
    console.log(err.stack)
    err.status = err.status || "error"
    err.statusCode = err.statusCode || 500
    res.status(500).json({ message: err.message || "Server Error", status: err.status, statusCode: err.statusCode })
})


export default app;