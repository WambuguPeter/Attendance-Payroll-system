
import jwt from 'jsonwebtoken';
import { notAuthorized } from '../helper/helperFunctions.js';

export const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    console.log("req is ", req.headers.authorization.split(" ")[1]);

    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET,
      (err, decode) => {
        if ( err )
        {
          console.log("error is ",err);
          return notAuthorized(res, "Unauthorized user");
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else
  {
    console.log("req is ",req.headers);
    return notAuthorized(res, "Unauthorized user");
  }
};
