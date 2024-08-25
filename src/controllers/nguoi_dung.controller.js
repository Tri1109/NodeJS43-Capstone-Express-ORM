import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

const model = initModels(sequelize);

// Lấy thông tin người dùng
const layThongTinNguoiDung = async (req, res) => {
  try {
    const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

    // Tìm thông tin người dùng trong cơ sở dữ liệu
    const user = await model.nguoi_dung.findOne({
      where: { nguoi_dung_id },
      attributes: ["nguoi_dung_id", "email", "ho_ten", "tuoi", "anh_dai_dien"], // Các trường thông tin muốn trả về
    });

    if (user) {
      responseData(user, "Lấy thông tin người dùng thành công!", 200, res);
    } else {
      responseData("", "Không tìm thấy người dùng với ID này.", 404, res);
    }
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi lấy thông tin người dùng.", 500, res);
  }
};

// Chỉnh sửa thông tin cá nhân của người dùng
const chinhSuaThongTinCaNhan = async (req, res) => {
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã
  const { email, ho_ten, tuoi, anh_dai_dien } = req.body; // Các thông tin có thể được cập nhật

  try {
    const user = await model.nguoi_dung.findOne({
      where: { nguoi_dung_id },
    });

    if (!user) {
      return responseData("", "Không tìm thấy người dùng.", 404, res);
    }

    // Cập nhật thông tin người dùng
    user.email = email || user.email;
    user.ho_ten = ho_ten || user.ho_ten;
    user.tuoi = tuoi || user.tuoi;
    user.anh_dai_dien = anh_dai_dien || user.anh_dai_dien;

    await user.save();

    responseData(user, "Cập nhật thông tin cá nhân thành công!", 200, res);
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi cập nhật thông tin cá nhân.", 500, res);
  }
};

export { layThongTinNguoiDung, chinhSuaThongTinCaNhan };
