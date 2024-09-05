import multer, { diskStorage } from "multer";

// Cấu hình multer với đường dẫn và cách đặt tên file
export const upload = multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      // Đặt thư mục lưu trữ file
      callback(null, process.cwd() + "/public/imgs");
    },
    filename: (req, file, callback) => {
      // Đổi tên file thành timestamp + tên file gốc
      let newName = new Date().getTime() + "_" + file.originalname;
      callback(null, newName);
    },
  }),
});
