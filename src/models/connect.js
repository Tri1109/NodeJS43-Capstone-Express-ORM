import { Sequelize } from "sequelize";
import config from "../config/config.js";

// const sequelize = new Sequelize("db_capstone1", "root", "123456", {
//   host: "localhost",
//   port: "3307",
//   dialect: "mysql",
// });

// Khởi tạo Sequelize với các biến cấu hình từ config.js
const sequelize = new Sequelize(config.database, config.user, config.pass, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
});

// Kiểm tra kết nối với cơ sở dữ liệu
sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối thành công với cơ sở dữ liệu!");
  })
  .catch((err) => {
    console.error("Không thể kết nối với cơ sở dữ liệu:", err);
  });

export default sequelize;
