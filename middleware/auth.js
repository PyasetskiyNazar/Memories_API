
import jwt from "jsonwebtoken";

const secret = 'test';

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    const isCustomAuth = token.length > 30;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret)
      req.userId = decodedData.id
    } else {
      req.userId = token
    }
    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError')
      return res.status(401).json({ message: "Unathorized" })

  }
};
