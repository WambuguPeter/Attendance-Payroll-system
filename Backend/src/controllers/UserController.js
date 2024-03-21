import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import nodemailer from "nodemailer"
import { addEmployeeService, 
    deleteEmployeeService, 
    getAllUserService, 
    getEmployeeByIDService,
     getUserByEmailService, 
     updateEmployeeService} from "../services/UserService.js";
import { userLoginvalidator, validateNewEmployee } from "../validators/UserValidator.js";
import { sendBadRequest, sendDeleteSuccess, sendCreated,
sendNotFound,
sendServerError,
sendSuccess,
checkIfValuesIsEmptyNullUndefined} from "../helper/helperFunctions.js"; 
import emailTemp from "../utils/EmailTemp.js";    
import { response } from "express";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();


const checkEmployee = async (req) => {
  const employeeID = Number(req.params.EmployeeID);
  const employee = await getEmployeeByIDService(employeeID);
  if (employee.length == 0 || employee.message) {
      return false;
  } else {
      return true;
  }
}

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
  
      if (employee.length != 0) {
        return res.status(200).json(employee);
      } else {
        return res.status(404).json({ error: "Employee not found" });
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
            return res.status(400).json({ error : "Employee already exists(Email)"});
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
            // sendMail(Email);
            sendCreated(res, "Employee created successfully");
          } else {
            sendServerError(res, "Failed to create Employee");
          }
    } catch (error) {
        sendServerError(res, error.message);
    }
}

//send Email
export const sendMail = async (Email) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: Email,
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


export const deleteEmployee = async (req, res) => {
  try {
      const employeeID = Number(req.params.EmployeeID);
      if (await checkEmployee(req)) {
          const result = await deleteEmployeeService(employeeID);
          if (result && result.message) {
              return res.status(500).send({ "error": result.message });
          } else {
              return sendDeleteSuccess(res, 'Employee deleted successfully');
          }
      } else {
          return sendNotFound(res, 'Employee not found');
      }

  } catch (error) {
      sendServerError(res, error.message);
  }
}

// export const updateUser = async (req, res) => {
//   try {
//       const userId = Number(req.params.id);
//       const { error } = updateUserValidator(req.body);
//       if (error) {
//           return res.status(400).send(error.details[0].message);
//       } else {
//           if (await checkUser(req)) {
//               const { username, email, password, img_url } = req.body;
//               let updatedUserData = { username, email };

//               if (password) {
//                   const hashedPassword = await hashPassword(password);
//                   updatedUserData.password = hashedPassword;
//               }

//               if (img_url) {
//                   updatedUserData.img_url = img_url;
//               }

//               const updateResult = await updateUserService(userId, updatedUserData);

//               if (updateResult.message) {
//                   return res.status(500).send({ "error": updateResult.message });
//               } else {
//                   res.status(200).json({ "message": "User updated successfully" });
//               }
//           } else {
//               return sendNotFound(res, 'User not found');
//           }
//       }
//   } catch (error) {
//       sendServerError(res, error.message);
//   }
// }



export const updateUserController = async (req, res) => {
    try {
      const employeeID = Number(req.params.EmployeeID);
      const exists = await checkEmployee(req);

      if (!exists){
        return res.status(404).json({ message: "Employee not found" });
      }
      
      if (exists){
        console.log("he exists")
      }
      const employeeData = await getEmployeeByIDService(employeeID);
      // console.log(employeeData)
     
      const updatedEmployeeData ={ ...employeeData[0], ...req.body };
      console.log("employeeData :", employeeData)
      updatedEmployeeData.EmployeeID =employeeID;
      // console.log(employeeID)

      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
            const {FirstName, LastName, Location, BirthDate, Contact, Gender,admin, PositionID,
            ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio } = req.body;
            if (FirstName) {
              updatedEmployeeData.FirstName = FirstName;
            }
            if (LastName) {
              updatedEmployeeData.LastName = LastName;
            }
            if (Location) {
              updatedEmployeeData.Location = Location;
            }
            if (BirthDate) {
              updatedEmployeeData.BirthDate = BirthDate;
            }
            if (Contact) {
              updatedEmployeeData.Contact = Contact;
            }
            if (Gender) {
              updatedEmployeeData.Gender = Gender;
            }
            if (admin) {
              updatedEmployeeData.admin = admin;
            }
            if (PositionID) {
              updatedEmployeeData.PositionID = PositionID;
            }
            if (ScheduleID) {
              updatedEmployeeData.ScheduleID = ScheduleID;
            }
            if (PhotoURL) {
              updatedEmployeeData.PhotoURL = PhotoURL;
            }
            if (Email) {
              updatedEmployeeData.Email = Email;
            }
            if (Password) {
              updatedEmployeeData.Password = Password;
            }
            if (BankName) {
              updatedEmployeeData.BankName = BankName;
            }
            if (BankBranch) {
              updatedEmployeeData.BankBranch = BankBranch;
            }
            if (AccountNumber) {
              updatedEmployeeData.AccountNumber = AccountNumber;
            }
            if (Bio) {
              updatedEmployeeData.Bio = Bio;
            }
          
            const updatedEmployee = await updateEmployeeService(updatedEmployeeData, employeeID);
            if (updatedEmployee && updatedEmployee.rowsAffected && updatedEmployee.rowsAffected[0] > 0) {
              return res.status(200).json({ message: "Employee updated successfully" });
            } else {
              return res.status(500).json({ error: "Failed to update employee" });
          }}
        } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  }

 