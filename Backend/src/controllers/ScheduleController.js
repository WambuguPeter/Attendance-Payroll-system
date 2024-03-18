import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { userLoginvalidator, validateNewEmployee } from "../validators/UserValidator.js";
import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAllSchedulesService, getScheludeByIDService } from "../services/ScheduleService.js"
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllSchedulesController = async (req,res) => {
    try {
        const data = await getAllSchedulesService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Schedules");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getScheduleByIDController = async (req, res) => {
    try {
      const ScheduleID = req.params.ScheduleID;
      const schedule = await getScheludeByIDService(ScheduleID);
  
      if (schedule.length != 0) {
        return res.status(200).json(schedule);
      } else {
        return res.status(404).json({ error: "Schedule not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  


//Adding an Employee
// export const addEmployeeController = async (req, res) =>{
//     const {
//         FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio 
//     } = req.body;
//     console.log(req.body);

//     try {

//         const {error} = validateNewEmployee({
//             FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio 
//         });

//         if (error){
//             // return res.status(400).send(error.details.message);
//             return res.status(400).send(error.details[0].message);
//         }

//         const existingUser = await getUserByEmailService(Email);

//         if (existingUser) {
//             return res.status(400).json({ error : "Employee already exists"});
//             // console.log("Use in the syste alredy");
//         }
        
//         const newEmployee = {
//             FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio 
//         }
//         // console.log(newEmployee);

//         const response = await addEmployeeService(newEmployee);

//         if (response instanceof Error){
//             throw response;
//         }

//         if (response.rowsAffected && response.rowsAffected[0] === 1) {
//             // sendMail(newUser.Email);
//             sendCreated(res, "Employee created successfully");
//           } else {
//             sendServerError(res, "Failed to create Employee");
//           }
//     } catch (error) {
//         sendServerError(res, error.message);
//     }
// }


// export const deleteSchedule1 = async (req, res) => {
//   try {
//       const ScheduleID = req.params.ScheduleID;
//     //   console.log("ScheduleID!!! :", ScheduleID);
//     const toBeDeleted = await getScheludeByIDService(ScheduleID);

//     if (toBeDeleted.length == 0) {
//         return res.status(404).json({message: "Schedule not found"});
//     } else {
//         await deleteScheduleService(ScheduleID);
//         return res.status(200).json({
//             message: "Schedule deleted successfully"
//         });
//     }
          
//   } catch (error) {
//       return res.status(500).json({
//           error: error.message
//       });
//   }
// }


// export const deleteSchedule = async (req, res) => {
//     try {
//         const ScheduleID = req.params.ScheduleID; // Assuming ScheduleID is passed in the request parameters
//         const toBeDeleted = await getScheludeByIDService(ScheduleID);

//         if (toBeDeleted.length === 0) {
//             return res.status(404).json({ message: "Schedule not found" });
//         } else {
//             await deleteScheduleService(ScheduleID);
//             return res.status(200).json({ message: "Schedule deleted successfully" });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }


// export const updateUser = async (req, res) => {
//     try {
//       const data = await getUserService();
//       const user = data.find((item) => item.UserID == req.params.id);
//       if (!user) {
//         sendNotFound(res, "User to update not found");
//       } else {
//         if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
//           const { Username, Email, Password, TagName, Location } = req.body;
//           if (Username) {
//             tbl_User.Username = Username;
//           }
//           if (Email) {
//             tbl_User.Email = Email;
//           }
//           if (Password) {
//             tbl_User.Password = Password;
//           }
//           if (TagName) {
//             tbl_User.TagName = TagName;
//           }
//           if (Location) {
//             tbl_User.Location = Location;
//           }
//           const updatedUser = await updateUserService(user);
//           //res.status(200).json(updatedUser);
//           console.log(updatedUser);
//           sendCreated(res, "User updated successfully");
//         } else {
//           sendServerError(res, "Please provide a complete field");
//         }
//       }
//     } catch (error) {
//       sendServerError(res, error.message);
//     }
//   };
  