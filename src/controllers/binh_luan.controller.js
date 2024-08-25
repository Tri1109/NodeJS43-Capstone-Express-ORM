import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

const model = initModels(sequelize);

// Lấy thông tin bình luận theo hinh_id
const layThongTinBinhLuanTheoHinhId = async (req, res) => {
  const { hinh_id } = req.params;

  try {
    const hinhAnh = await model.hinh_anh.findOne({ where: { hinh_id } });

    if (!hinhAnh) {
      return responseData("", "Không tìm thấy hình ảnh với ID này.", 404, res);
    }

    const binhLuans = await model.binh_luan.findAll({
      where: { hinh_id },
      include: [
        {
          model: model.nguoi_dung,
          as: "nguoi_dung",
          attributes: ["nguoi_dung_id", "ho_ten", "email"],
        },
      ],
    });

    if (binhLuans.length > 0) {
      responseData(binhLuans, "Lấy thông tin bình luận thành công!", 200, res);
    } else {
      responseData([], "Không tìm thấy bình luận cho hình ảnh này.", 404, res);
    }
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi lấy thông tin bình luận.", 500, res);
  }
};

// Lưu thông tin bình luận của người dùng với hình ảnh
const luuBinhLuan = async (req, res) => {
  const { hinh_id, noi_dung } = req.body;
  // const { noi_dung } = req.body;
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

  try {
    // Kiểm tra xem hình ảnh có tồn tại hay không
    const hinhAnh = await model.hinh_anh.findOne({ where: { hinh_id } });

    if (!hinhAnh) {
      return responseData("", "Không tìm thấy hình ảnh với ID này.", 404, res);
    }

    // Tạo bình luận mới
    const newComment = {
      nguoi_dung_id,
      hinh_id,
      ngay_binh_luan: new Date(),
      noi_dung,
    };

    await model.binh_luan.create(newComment);
    responseData(newComment, "Bình luận đã được lưu thành công!", 201, res);
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi lưu bình luận.", 500, res);
  }
};

export { layThongTinBinhLuanTheoHinhId, luuBinhLuan };
