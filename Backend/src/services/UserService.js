import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();

//Register new Employeee

export const addEmployeeService = async (newEmployee) => {
    try {
        const result = await poolRequest()
        .input("FirstName", sql.VarChar(255), newEmployee.FirstName)
        .input("LastName", sql.VarChar(255), newEmployee.LastName)
        .input("Location", sql.VarChar(255), newEmployee.Location)
        .input("BirthDate", sql.Date, newEmployee.BirthDate)
        .input("Contact", sql.VarChar(255), newEmployee.Contact)
        .input("Gender", sql.VarChar(255), newEmployee.Gender)
        .input("admin", sql.Bit, newEmployee.admin)
        .input("PositionID", sql.Int, newEmployee.PositionID)
        .input("ScheduleID", sql.Int, newEmployee.ScheduleID)
        .input("PhotoURL", sql.VarChar(999), newEmployee.PhotoURL)
        .input("Email", sql.VarChar(255), newEmployee.Email)
        .input("Password", sql.VarChar(255), newEmployee.Password)
        .input("BankName", sql.VarChar(255), newEmployee.BankName)
        .input("BankBranch", sql.VarChar(255), newEmployee.BankBranch)
        .input("AccountNumber", sql.VarChar(255), newEmployee.AccountNumber)
        .input("Bio", sql.VarChar(255), newEmployee.Bio) 
        .query(
            `INSERT INTO Employees (FirstName, LastName, Location, BirthDate, Contact, Gender,admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio)
            VALUES (@FirstName, @LastName, @Location, @BirthDate, @Contact, @Gender,@admin, @PositionID, @ScheduleID, @PhotoURL, @Email, @Password, @BankName, @BankBranch, @AccountNumber, @Bio)`
        );
        return result;
        
    } catch (error) {
        return error;
    }

}

//Get all Users
export const getAllUserService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Employees");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};

//get user by Id
export const getEmployeeByIDService = async (EmployeeID) =>{
    try {
        const result = await poolRequest()
        .input("EmployeeID", sql.Int,  EmployeeID)
        .query("SELECT * FROM Employees WHERE EmployeeID= @EmployeeID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};

export const getUserByEmailService = async (Email) =>{
    try {
        const result = await poolRequest()
        .input("Email", sql.VarChar(255),  Email)
        .query("SELECT * FROM Employees WHERE Email= @Email" );
        return result.recordset[0];        
    } catch (error) {
        return error.message;
    }
};



export const deleteEmployeeService = async (EmployeeID) => {
    try {
        console.log("EmployeeID at delete sevice",EmployeeID)
        const result = await poolRequest()
        .input ('EmployeeID',sql.Int, EmployeeID)
        .query('DELETE FROM Employees WHERE EmployeeID=@EmployeeID');
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

export const updateUserService = async (user) => {
    const { UserID, Username, Email, Password, TagName, Location } = user;
    try {
      const result = await poolRequest()
        .input("UserID", sql.Int, UserID)
        .input("Username", sql.VarChar, Username)
        .input("Email", sql.VarChar, Email)
        .input("Password", sql.VarChar, Password)
        .input("TagName", sql.VarChar, TagName)
        .input("Location", sql.VarChar, Location)
        .query(
          "UPDATE tbl_User SET Username=@Username, Email=@Email, Password=@Password, TagName=@TagName, Location=@Location WHERE UserID=@UserID"
        );
      return result;
    } catch (error) {
      return error;
    }
  };