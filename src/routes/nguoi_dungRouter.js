import express from "express";
import {
  chinhSuaThongTinCaNhan,
  layThongTinNguoiDung,
} from "../controllers/nguoi_dung.controller.js";
import { middleWareToken } from "../config/jwt.js";

const nguoi_dungRouter = express.Router();

// Lấy thông tin người dùng
nguoi_dungRouter.get(
  "/lay-thong-tin-nguoi-dung",
  middleWareToken,
  layThongTinNguoiDung
);

nguoi_dungRouter.put(
  "/chinh-sua-thong-tin-nguoi-dung",
  middleWareToken,
  chinhSuaThongTinCaNhan
);

export default nguoi_dungRouter;
