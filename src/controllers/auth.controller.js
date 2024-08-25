import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { createToken } from "../config/jwt.js";

const model = initModels(sequelize);

// Đăng kí
const dangKi = async (req, res) => {
  let { email, mat_khau, ho_ten, tuoi } = req.body;
  // Kiểm tra trùng email
  let kiemTraEmail = await model.nguoi_dung.findOne({
    where: {
      email,
    },
  });

  if (kiemTraEmail) {
    responseData("", "Email đã tồn tại!", 409, res);
    return;
  }

  let newData = {
    email,
    mat_khau: bcrypt.hashSync(mat_khau, 10),
    ho_ten,
    tuoi,
    anh_dai_dien: "",
  };
  await model.nguoi_dung.create(newData);
  responseData("", "Đăng kí thành công!", 201, res);
};

// Đăng nhập
const dangNhap = async (req, res) => {
  let { email, mat_khau } = req.body;

  let checkEmail = await model.nguoi_dung.findOne({
    where: {
      email,
    },
  });

  if (checkEmail) {
    if (bcrypt.compareSync(mat_khau, checkEmail.mat_khau)) {
      let token = createToken({
        userId: checkEmail.dataValues.nguoi_dung_id,
      });
      responseData(token, "Đăng nhập thành công!", 201, res);
    } else {
      responseData("", "Mật khẩu không đúng!", 403, res);
    }
  } else {
    responseData("", "Email không đúng!", 403, res);
  }
};
export { dangKi, dangNhap };
