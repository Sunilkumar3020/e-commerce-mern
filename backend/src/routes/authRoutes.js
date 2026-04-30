import express from "express";
import { register, login, logout, emailCheck } from "../controllers/authController.js"
const router = express.Router();

router.post('/register', register);
router.post("/emailCheck", emailCheck)
router.post('/login', login);
router.post('/logout', logout)

export default router;