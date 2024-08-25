import express from "express";
import {
  layThongTinBinhLuanTheoHinhId,
  luuBinhLuan,
} from "../controllers/binh_luan.controller.js";
import { middleWareToken } from "../config/jwt.js";

const binh_luanRouter = express.Router();

// Lấy thông tin bình luận theo id của hình ảnh
binh_luanRouter.get(
  "/lay-thong-tin-binh-luan/:hinh_id",
  middleWareToken,
  layThongTinBinhLuanTheoHinhId
);

//Lưu bình luận
binh_luanRouter.post("/luu-binh-luan", middleWareToken, luuBinhLuan);

export default binh_luanRouter;
