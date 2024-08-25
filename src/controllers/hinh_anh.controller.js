import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import { Op } from "sequelize";

const model = initModels(sequelize);

// Lấy danh sách hình ảnh
const layDanhSachHinhAnh = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll();

    responseData(data, "Lấy danh sách hình ảnh thành công!", 200, res);
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi lấy dữ liệu!", 500, res);
  }
};

// Tìm danh sách hình ảnh theo tên
const layDanhSachHinhAnhTheoTen = async (req, res) => {
  let { ten_hinh } = req.query;

  try {
    const danhSachHinhAnh = await model.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${ten_hinh}%`,
        },
      },
    });

    if (danhSachHinhAnh.length > 0) {
      responseData(danhSachHinhAnh, "Tìm kiếm hình ảnh thành công!", 200, res);
    } else {
      responseData("", "Không tìm thấy hình ảnh nào phù hợp.", 404, res);
    }
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi tìm kiếm hình ảnh.", 500, res);
  }
};

// Lấy thông tin của ảnh và người tạo ảnh theo hinh_id
const layThongTinHinhAnhVaNguoiTao = async (req, res) => {
  const { hinh_id } = req.params;

  try {
    const hinhAnh = await model.hinh_anh.findOne({
      where: { hinh_id },
      include: [
        {
          model: model.nguoi_dung,
          as: "nguoi_dung",
          attributes: ["nguoi_dung_id", "ho_ten", "email", "tuoi"], // Các thông tin muốn lấy từ người tạo ảnh
        },
      ],
    });

    if (hinhAnh) {
      responseData(
        hinhAnh,
        "Lấy thông tin hình ảnh và người tạo thành công!",
        200,
        res
      );
    } else {
      responseData("", "Không tìm thấy hình ảnh với ID này.", 404, res);
    }
  } catch (error) {
    responseData(
      "",
      "Đã xảy ra lỗi khi lấy thông tin hình ảnh và người tạo.",
      500,
      res
    );
  }
};

// Thêm hình ảnh mới
const themHinhAnh = async (req, res) => {
  const { ten_hinh, duong_dan, mo_ta } = req.body;
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

  try {
    const newImage = {
      ten_hinh,
      duong_dan,
      mo_ta,
      nguoi_dung_id,
    };

    const createdImage = await model.hinh_anh.create(newImage);
    responseData(createdImage, "Thêm hình ảnh thành công!", 201, res);
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi thêm hình ảnh.", 500, res);
  }
};

// Xóa hình ảnh
const xoaHinhAnh = async (req, res) => {
  const { hinh_id } = req.params;
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

  try {
    // Kiểm tra xem hình ảnh có tồn tại và thuộc sở hữu của người dùng hay không
    const hinhAnh = await model.hinh_anh.findOne({
      where: {
        hinh_id,
        nguoi_dung_id, // Chỉ cho phép xóa nếu người dùng là chủ sở hữu của ảnh
      },
    });

    if (!hinhAnh) {
      return responseData(
        "",
        "Không tìm thấy hình ảnh hoặc bạn không có quyền xóa hình ảnh này.",
        404,
        res
      );
    }

    // Xóa hình ảnh
    await model.hinh_anh.destroy({
      where: { hinh_id },
    });

    responseData("", "Xóa hình ảnh thành công!", 200, res);
  } catch (error) {
    responseData("", "Đã xảy ra lỗi khi xóa hình ảnh.", 500, res);
  }
};

// Lấy danh sách hình ảnh đã lưu theo id người dùng
const layDanhSachHinhAnhDaLuu = async (req, res) => {
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

  try {
    const danhSachHinhAnh = await model.hinh_anh.findAll({
      include: [
        {
          model: model.luu_anh,
          as: "luu_anhs",
          where: { nguoi_dung_id },
          attributes: [], // Không cần lấy thông tin từ bảng `luu_anh`, chỉ cần điều kiện lọc
        },
      ],
    });

    responseData(
      danhSachHinhAnh,
      "Lấy danh sách hình ảnh đã lưu thành công!",
      200,
      res
    );
  } catch (error) {
    responseData(
      "",
      "Đã xảy ra lỗi khi lấy danh sách hình ảnh đã lưu.",
      500,
      res
    );
  }
};

// Lấy danh sách hình ảnh đã tạo theo id người dùng
const layDanhSachHinhAnhDaTao = async (req, res) => {
  const nguoi_dung_id = req.user.userId; // Lấy userId từ token đã được giải mã

  try {
    const danhSachHinhAnh = await model.hinh_anh.findAll({
      where: { nguoi_dung_id },
    });

    responseData(
      danhSachHinhAnh,
      "Lấy danh sách hình ảnh đã tạo thành công!",
      200,
      res
    );
  } catch (error) {
    responseData(
      "",
      "Đã xảy ra lỗi khi lấy danh sách hình ảnh đã tạo.",
      500,
      res
    );
  }
};

export {
  layDanhSachHinhAnh,
  layDanhSachHinhAnhTheoTen,
  layThongTinHinhAnhVaNguoiTao,
  themHinhAnh,
  xoaHinhAnh,
  layDanhSachHinhAnhDaLuu,
  layDanhSachHinhAnhDaTao,
};
