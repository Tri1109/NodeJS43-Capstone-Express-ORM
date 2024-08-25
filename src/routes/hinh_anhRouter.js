import express from "express";
import {
  layDanhSachHinhAnh,
  layDanhSachHinhAnhDaLuu,
  layDanhSachHinhAnhDaTao,
  layDanhSachHinhAnhTheoTen,
  layThongTinHinhAnhVaNguoiTao,
  themHinhAnh,
  xoaHinhAnh,
} from "../controllers/hinh_anh.controller.js";
import { middleWareToken } from "../config/jwt.js";

const hinh_anhRouter = express.Router();

// Lấy danh sách hình ảnh
hinh_anhRouter.get("/lay-danh-sach-anh", middleWareToken, layDanhSachHinhAnh);

// Lấy danh sách hình ảnh theo tên
hinh_anhRouter.get(
  "/lay-danh-sach-anh-theo-ten",
  middleWareToken,
  layDanhSachHinhAnhTheoTen
);

// Lấy thông tin hình ảnh và người tạo ảnh theo hinh_id
hinh_anhRouter.get(
  "/lay-thong-tin-anh/:hinh_id",
  middleWareToken,
  layThongTinHinhAnhVaNguoiTao
);

// Thêm hình ảnh mới
hinh_anhRouter.post("/them-anh", middleWareToken, themHinhAnh);

// Xóa hình ảnh
hinh_anhRouter.delete("/xoa-anh/:hinh_id", middleWareToken, xoaHinhAnh);

// Lấy danh sách hình ảnh đã lưu theo id người dùng
hinh_anhRouter.get(
  "/lay-danh-sach-anh-da-luu",
  middleWareToken,
  layDanhSachHinhAnhDaLuu
);

// Lấy danh sách hình ảnh đã tạo theo id người dùng
hinh_anhRouter.get(
  "/lay-danh-sach-anh-da-tao",
  middleWareToken,
  layDanhSachHinhAnhDaTao
);

export default hinh_anhRouter;
