import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { addEmployeeService, 
    deleteEmployeeService, 
    getAllUserService, 
    getEmployeeByIDService,
     getUserByEmailService } from "../services/UserService.js";
import { userLoginvalidator, validateNewEmployee } from "../validators/UserValidator.js";
import { sendBadRequest, sendDeleteSuccess, sendCreated,
sendNotFound,
sendServerError,
sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllUserController = async (req,res) => {
    try {
        const data = await getAllUserService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Employee");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getEmpByIDController = async (req, res) => {
    try {
      const EmployeeID = req.params.EmployeeID;
      const employee = await getEmployeeByIDService(EmployeeID);
  
      if (employee) {
        return res.status(200).json(employee);
      } else {
        // return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  


//Adding an Employee
export const addEmployeeController = async (req, res) =>{
    const {
        FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio 
    } = req.body;
    console.log(req.body);

    try {

        const {error} = validateNewEmployee({
            FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio 
        });

        if (error){
            // return res.status(400).send(error.details.message);
            return res.status(400).send(error.details[0].message);
        }

        const existingUser = await getUserByEmailService(Email);

        if (existingUser) {
            return res.status(400).json({ error : "Employee already exists"});
            // console.log("Use in the syste alredy");
        }
        
        const newEmployee = {
            FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio 
        }
        // console.log(newEmployee);

        const response = await addEmployeeService(newEmployee);

        if (response instanceof Error){
            throw response;
        }

        if (response.rowsAffected && response.rowsAffected[0] === 1) {
            // sendMail(newUser.Email);
            sendCreated(res, "Employee created successfully");
          } else {
            sendServerError(res, "Failed to create Employee");
          }
    } catch (error) {
        sendServerError(res, error.message);
    }
}

//send Email
export const sendMail = async (email) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome To TillHappens Ltd!",
      html: emailTemp,
    };
    try {
      logger.info("Sending mail....");
      await transporter.sendMail(mailOptions);
      logger.info("Email sent successfully!");
    } catch (error) {
      logger.error(error);
    }
  };


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

// export const getEmployeeByIDController = async (req, res) =>{
//     try {
//         const data = await getUserService();
//         const user = data.find((item) => item.UserID == req.params.id);
//         if (!user) {
//             sendNotFound(res, 'User not found');}
//             else{
//                 res.status(200).send(user);
//             }
//         }
//      catch (error) {
//         sendServerError(res, error.message);
//     }
// }




export const deleteEmployee = async (req, res) => {
  try {
      const EmployeeID = req.params.EmployeeID;
      console.log("EmployeeID!!! :", EmployeeID);
      const data = await getAllUserService();
      console.log(data);
      
    //   Check if the user exists
      const deleteThisEmployee = data.find((Employee) => Employee.EmployeeID === EmployeeID);
      console.log("deleteThisEmployee",deleteThisEmployee);
      if (!deleteThisEmployee) {
          return res.status(404).json({ message: "Employee not found!!" });
      }

    //   If the user exists, proceed with deletion
      await deleteEmployeeService(EmployeeID);

      return res.status(200).json({
          message: "Employee deleted successfully"
      });
      
  } catch (error) {
      return res.status(500).json({
          error: error.message
      });
  }
}


export const updateUser = async (req, res) => {
    try {
      const data = await getUserService();
      const user = data.find((item) => item.UserID == req.params.id);
      if (!user) {
        sendNotFound(res, "User to update not found");
      } else {
        if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
          const { Username, Email, Password, TagName, Location } = req.body;
          if (Username) {
            tbl_User.Username = Username;
          }
          if (Email) {
            tbl_User.Email = Email;
          }
          if (Password) {
            tbl_User.Password = Password;
          }
          if (TagName) {
            tbl_User.TagName = TagName;
          }
          if (Location) {
            tbl_User.Location = Location;
          }
          const updatedUser = await updateUserService(user);
          //res.status(200).json(updatedUser);
          console.log(updatedUser);
          sendCreated(res, "User updated successfully");
        } else {
          sendServerError(res, "Please provide a complete field");
        }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  