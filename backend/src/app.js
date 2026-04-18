import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    // origin: process.env.CLIENT_URL,
    origin: "http://localhost:5174/",
    credentials: true
}));
app.get('/', (req, res) => {
    res.send("Hello")
})

//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/products', productRoutes)

// Global Error handler (IMPORTANT)

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Server Error" })
})


export default app;