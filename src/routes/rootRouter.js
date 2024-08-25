import express from "express";
import authRouter from "./authRouter.js";
import hinh_anhRouter from "./hinh_anhRouter.js";
import binh_luanRouter from "./binh_luanRouter.js";
import luu_anhRouter from "./luu_anhRouter.js";
import nguoi_dungRouter from "./nguoi_dungRouter.js";

const rootRouter = express.Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/hinh_anh", hinh_anhRouter);
rootRouter.use("/binh_luan", binh_luanRouter);
rootRouter.use("/luu_anh", luu_anhRouter);
rootRouter.use("/nguoi_dung", nguoi_dungRouter);

export default rootRouter;
