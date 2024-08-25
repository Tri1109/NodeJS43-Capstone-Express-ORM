import jwt from "jsonwebtoken";

export const createToken = (data) => {
  return jwt.sign({ data: data }, "NODE_43", {
    algorithm: "HS256",
    expiresIn: "5h",
  });
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

// export const verifyToken = (token) => {
//   return jwt.verify(token, "NODE_43", (error) => {
//     return error;
//   });
// };

// export const middleWareToken = (req, res, next) => {
//   let { token } = req.headers;

//   let checkToken = verifyToken(token);
//   if (checkToken == null) {
//     next();
//   } else {
//     console.log(checkToken.message);
//     res.status(401).send(checkToken.message);
//   }
// };

// Xác thực token và trả về dữ liệu nếu hợp lệ, trả về lỗi nếu không hợp lệ
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, "NODE_43");
  } catch (error) {
    return null;
  }
};

// Middleware xác thực token, nếu hợp lệ thì cho phép tiếp tục, ngược lại trả về lỗi
export const middleWareToken = (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    return res.status(401).send("Token không được cung cấp!");
  }

  let checkToken = verifyToken(token);
  if (checkToken) {
    req.user = checkToken.data; // Lưu thông tin người dùng vào req để sử dụng trong các controller
    next();
  } else {
    res.status(401).send("Token không hợp lệ hoặc đã hết hạn!");
  }
};
