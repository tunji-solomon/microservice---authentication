import { Router } from "express";
import { register, login, update } from "../controller/auth";
import { authMiddleware } from '../middleware'

const router = Router()

router.post("/register", register);
router.post("/login", login);
router.put("/update", authMiddleware,update );

export default router;