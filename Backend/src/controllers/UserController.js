import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import nodemailer from "nodemailer"
import { addEmployeeService, 
    deleteEmployeeService, 
    getAllUserService, 
    getEmployeeByIDService,
     getUserByEmailService, 
     getUserByEmailService1, 
     updateEmployeeService} from "../services/UserService.js";
import { userLoginvalidator, validateNewEmployee } from "../validators/UserValidator.js";
import { sendBadRequest, sendDeleteSuccess, sendCreated,
sendNotFound,
sendServerError,
sendSuccess,
checkIfValuesIsEmptyNullUndefined} from "../helper/helperFunctions.js"; 
 
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

//get all
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

//get by ID
export const getEmpByIDController = async (req, res) => {
    try {
      const employeeID = Number(req.params.EmployeeID);
      const employee = await getEmployeeByIDService(employeeID);
      // console.log(employee)
  
      if (employee.length != 0) {
        return res.status(200).json(employee);
      } else {
        return res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  
//get by email (forgot password)
export const getEmpByEmailController1 = async (req, res) => {
  try {
    const email = req.params.Email;
    const employee = await getUserByEmailService1(email);

    if (employee) {
      // Send email with password
      await sendMailForgot(employee.Email, employee.FirstName, employee.LastName, employee.Password);
      
      return res.status(200).json(employee);
    } else {
      return res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};


//send Email forgot Password
export const sendMailForgot = async (Email, FirstName, LastName, Password) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Generate HTML string for the email content
  const emailContent = `
    <html>
      <head>
        <title>Forgot Password???  @TillHappens</title>
        <!-- Add your custom styles here -->
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          /* Add more styles as needed */
        </style>
      </head>
      <body>
        <div>
          <h1>Welcome Back @TillHappens</h1>
          <p>Dear ${FirstName} ${LastName},</p>
          <p>Here is your Password to our platform. Welcome back to our community!</p>
          <p>Your password is:</p>
          <p>Password: ${Password}</p>
          <p>You can now login to our platform using the provided credentials.</p>
          <p>If you have any questions or need assistance, feel free to contact us at  info@tillHappens.com.</p>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: Email, // Ensure that Email is properly defined
    subject: "Welcome Back @TillHappens",
    html: emailContent,
  };

  try {
    logger.info("Sending mail(Forgot)....");
    await transporter.sendMail(mailOptions);
    logger.info("Email(Forgot) sent successfully!");
  } catch (error) {
    logger.error(error);
  }
};



//Adding an Employee
export const addEmployeeController = async (req, res) =>{
  const {
      FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, Email, Password, BankName, BankBranch, AccountNumber, Bio 
  } = req.body;

  try {
      const {error} = validateNewEmployee({
          FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, Email, Password, BankName, BankBranch, AccountNumber, Bio 
      });

      if (error){
          return res.status(400).send(error.details[0].message);
      }

      const existingUser = await getUserByEmailService(Email);

      if (existingUser) {
          return res.status(400).json({ error : "Employee already exists(Email)"});
      }
      
      const newEmployee = {
          FirstName, LastName, Location, BirthDate, Contact, Gender, admin, PositionID, ScheduleID, Email, Password, BankName, BankBranch, AccountNumber, Bio 
      }

      const addedEmployee = await addEmployeeService(newEmployee);

      if (addedEmployee instanceof Error){
          throw addedEmployee;
      }

      if (addedEmployee) {
          // Send email with credentials to the employee
          await sendMail(addedEmployee.Email, addedEmployee.FirstName, addedEmployee.LastName, addedEmployee.Password);
          // Return response
          res.status(201).json({ message: "Employee created successfully", addedEmployee });
      } else {
          res.status(500).json({ error: "Failed to create Employee" });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


//send Email
export const sendMail = async (Email, FirstName, LastName, Password) => {
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Generate HTML string for the email content
const emailContent = `
  <html>
    <head>
      <title>Welcome To TillHappens Ltd!</title>
      <!-- Add your custom styles here -->
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        /* Add more styles as needed */
      </style>
    </head>
    <body>
      <div>
        <h1>Welcome to TillHappens Ltd!</h1>
        <p>Dear ${FirstName} ${LastName},</p>
        <p>We are thrilled to welcome you to our platform. You are now part of our community!</p>
        <p>Your login credentials:</p>
        <p>Email: ${Email}</p>
        <p>Password: ${Password}</p>
        <p>You can now login to our platform using the provided credentials.</p>
        <p>If you have any questions or need assistance, feel free to contact us at  info@tillHappens.com.</p>
      </div>
    </body>
  </html>
`;

const mailOptions = {
  from: process.env.EMAIL,
  to: Email,
  subject: "Welcome To TillHappens Ltd!",
  html: emailContent,
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
    // console.log("Req: " ,req.body)
    const { error} = userLoginvalidator (req.body);
    // const {Email, Password} = req.body
    if(error){ 
        // console.log("Err: ", error)
        return sendBadRequest(res, error.details[0].message);
    } else {
    try {
        const user =await getUserByEmailService(Email);
        // console.log(user);
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




export const updateUserController = async (req, res) => {
    try {
      const employeeID = Number(req.params.EmployeeID);
      const exists = await checkEmployee(req);

      if (!exists){
        return res.status(404).json({ message: "Employee not found" });
      }
      
    
      const employeeData = await getEmployeeByIDService(employeeID);
      // console.log(employeeData)
     
      const updatedEmployeeData ={ ...employeeData[0], ...req.body };
      // console.log("employeeData :", employeeData)
      updatedEmployeeData.EmployeeID =employeeID;
      // console.log(employeeID)

      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
            const {FirstName, LastName, Location, BirthDate, Contact, Gender,admin, PositionID,
            ScheduleID, Email, Password, BankName, BankBranch, AccountNumber, Bio } = req.body;
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

 