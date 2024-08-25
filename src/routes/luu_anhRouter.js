import express from "express";
import {
  kiemTraAnhDaLuuChua,
  luuAnh,
} from "../controllers/luu_anh.controller.js";
import { middleWareToken } from "../config/jwt.js";

const luu_anhRouter = express.Router();

// Kiểm tra xem hình ảnh đã được lưu hay chưa
luu_anhRouter.get(
  "/kiem-tra-luu/:hinh_id",
  middleWareToken,
  kiemTraAnhDaLuuChua
);

// Lưu trạng thái đã lưu ảnh của người dùng (yêu cầu token hợp lệ)
luu_anhRouter.post("/luu-anh", middleWareToken, luuAnh);

export default luu_anhRouter;
