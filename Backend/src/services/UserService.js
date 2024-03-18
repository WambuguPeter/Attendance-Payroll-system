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


export const deleteEmployeeService = async (employeeID) => {
    try {
        console.log("EmployeeID at delete sevice",employeeID)
        const result = await poolRequest()
        .input ('EmployeeID',sql.Int, employeeID)
        .query("DELETE FROM Employees WHERE EmployeeID=@EmployeeID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const updateEmployeeService = async (employee) => {
    const { FirstName, LastName, Location, BirthDate, Contact, Gender,admin, PositionID,
         ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio } = employee;
        //  console.log(employee)
    try {
      const result = await poolRequest()
        // .input("EmployeeID", sql.Int, EmployeeID)           
        .input("FirstName", sql.VarChar, FirstName)
        .input("LastName", sql.VarChar, LastName)
        .input("Location", sql.VarChar, Location)
        .input("BirthDate", sql.Date, BirthDate)
        .input("Contact", sql.VarChar, Contact)
        .input("Gender", sql.VarChar, Gender)
        .input("admin", sql.Bit, admin)
        .input("PositionID", sql.Int, PositionID)
        .input("ScheduleID", sql.Int, ScheduleID)
        .input("PhotoURL", sql.VarChar, PhotoURL)
        .input("Email", sql.VarChar, Email)
        .input("Password", sql.VarChar, Password)
        .input("BankName", sql.VarChar, BankName)
        .input("BankBranch", sql.VarChar, BankBranch)
        .input("AccountNumber", sql.VarChar, AccountNumber)
        .input("Bio", sql.VarChar, Bio)
        .query(
          `UPDATE Employees 
           SET FirstName= @FirstName, LastName= @LastName, Location= @Location, BirthDate= @BirthDate, Contact= @Contact, Gender= @Gender, admin= @admin, 
          PositionID= @PositionID, ScheduleID= @ScheduleID, PhotoURL= @PhotoURL, Email= @Email, Password= @Password, BankName= @BankName, BankBranch= @BankBranch, AccountNumber= @AccountNumber, Bio= @Bio`
          );
      return result;
    } catch (error) {
        console.error("Error updating employee:", error);
      return error;
    }
  };