import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Shedules
export const getAllSchedulesService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Schedules");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


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


//get Schelude by Id
export const getScheludeByIDService = async (scheduleID) =>{
    try {
        const result = await poolRequest()
        .input("ScheduleID", sql.Int,  scheduleID)
        .query("SELECT * FROM Schedules WHERE ScheduleID= @ScheduleID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


export const deleteScheludeService = async (scheduleID) => {
    try {
        console.log("ScheduleID at delete sevice",scheduleID)
        const result = await poolRequest()
        .input ('ScheduleID',sql.Int, scheduleID)
        .query("DELETE FROM Employees WHERE ScheduleID=@ScheduleID");
        return result.recordset;
    } catch (error) {
        return error;
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