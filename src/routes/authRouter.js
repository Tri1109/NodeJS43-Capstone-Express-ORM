import express from "express";
import { dangKi, dangNhap } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Đăng kí
authRouter.post("/dang-ki", dangKi);

// Đăng nhập
authRouter.post("/dang-nhap", dangNhap);

export default authRouter;
