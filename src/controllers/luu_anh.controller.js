import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

const model = initModels(sequelize);

// Kiểm tra xem hình ảnh đã được lưu hay chưa
const kiemTraAnhDaLuuChua = async (req, res) => {
  const { hinh_id } = req.params;
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

  try {
    const luuAnh = await model.luu_anh.findOne({
      where: {
        hinh_id,
        nguoi_dung_id,
      },
    });

    if (luuAnh) {
      responseData(true, "Hình ảnh đã được lưu.", 200, res);
    } else {
      responseData(false, "Hình ảnh chưa được lưu.", 404, res);
    }
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi kiểm tra lưu ảnh.", 500, res);
  }
};

// Lưu ảnh (Lưu trạng thái đã lưu ảnh)
const luuAnh = async (req, res) => {
  const { hinh_id } = req.body;
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

  try {
    // Kiểm tra xem ảnh đã được lưu trước đó chưa
    const checkLuuAnh = await model.luu_anh.findOne({
      where: {
        hinh_id,
        nguoi_dung_id,
      },
    });

    if (checkLuuAnh) {
      return responseData("", "Hình ảnh này đã được lưu trước đó.", 409, res);
    }

    // Lưu trạng thái đã lưu ảnh
    const newLuuAnh = {
      nguoi_dung_id,
      hinh_id,
      ngay_luu: new Date(),
    };

    await model.luu_anh.create(newLuuAnh);
    responseData(newLuuAnh, "Lưu trạng thái hình ảnh thành công!", 201, res);
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi lưu trạng thái hình ảnh.", 500, res);
  }
};

export { kiemTraAnhDaLuuChua, luuAnh };
