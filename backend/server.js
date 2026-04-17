import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config({ path: './.env' })

const MONGODB_URL = process.env.MONGODB_STRING
const PORT = process.env.PORT

async function startServer() {
    try {
        await connectDB(MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`APP RUNNING ON PORT ${PORT}`)
        })
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

startServer()