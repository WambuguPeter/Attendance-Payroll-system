import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { getAllUserService, getUserByEmailService } from "../services/UserService.js";
import { userLoginvalidator } from "../validators/UserValidator.js";
import { sendBadRequest, sendDeleteSuccess, sendCreated,
sendNotFound,
sendServerError,
sendSuccess} from "../helper/helperFunctions.js";     

dotenv.config();

export const getAllUserController = async (req,res) => {
    try {
        const data = await getAllUserService();
        if (data.length=== 0) {
            sendNotFound(re, "Currently there is No Employee");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

// get user by email
// export const getUserByEmailController = async () =>{
//     try {
        
//     } catch (error) {
        
//     }
// }

//Login user
export const loginUserController = async (req, res) =>{
    const {Email, Password} = req.body;
    console.log("Req: " ,req.body)
    const { error} = userLoginvalidator (req.body);
    // const {Email, Password} = req.body
    if(error){ 
        console.log("Err: ", error)
        return sendBadRequest(res, error.details[0].message);
    } else {
    try {
        const user =await getUserByEmailService(Email);
        console.log(user);
        if (!user){
            return sendNotFound(res, "USer not Found");
        }
        if(Password !== user.Password){
            return sendBadRequest (res, "Invalid Password");
        }
        const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, {
            expiresIn: "72h",
        });
        const { Password: password, ...userDetails } = user;

        res.json({ message: "Logged in successfully", userDetails, token});

        
    } catch (error) {
       sendServerError(res, error.message); 
    }
}
};