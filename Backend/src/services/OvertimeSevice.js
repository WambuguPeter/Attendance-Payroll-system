import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Overtime
export const getAllOvertimesService = async () =>{
    try {
        const result = await poolRequest()
        .query(`
         SELECT Overtime.*, Employees.*
        FROM Overtime
        JOIN Employees ON Employees.EmployeeID = Overtime.EmployeeID`);
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get Overtimes by Id
export const getOvertimeByIDService = async (overtimeID) =>{
    try {
        const result = await poolRequest()
        .input("OvertimeID", sql.Int,  overtimeID)
        .query("SELECT * FROM Overtime WHERE OvertimeID= @OvertimeID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get Overtime by empoyeee Id
export const getOvertimeByEmpIDService = async (employeeID) =>{
    try {
        const result = await poolRequest()
        .input("EmployeeID", sql.Int, employeeID)
        .query(`
        SELECT Overtime.*, Employees.*
                FROM Overtime
                JOIN Employees ON Employees.EmployeeID = Overtime.EmployeeID
                WHERE Overtime.EmployeeID= @EmployeeID;
                
        `);
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


//Add new Overtime

export const addOvertimeService = async (newOvertime) => {
    try {
        const result = await poolRequest()
        .input("EmployeeID", sql.Int, newOvertime.EmployeeID)
        .input("AttendanceID", sql.Int, newOvertime.AttendanceID)
        .input("OvertimeHours", sql.Int, newOvertime.OvertimeHours)
        .input("OvertimeEarnings", sql.Decimal(10,2), newOvertime.OvertimeEarnings)
       
        .query(
            `INSERT INTO Overtime (EmployeeID, AttendanceID, OvertimeHours, OvertimeEarnings)
            VALUES (@EmployeeID, @AttendanceID, @OvertimeHours, @OvertimeEarnings)`
        );
        return result;
        
    } catch (error) {
        return error;
    }

}



//delete

export const deleteOvertimeService = async (overtimeID) => {
    try {
        const result = await poolRequest()
        .input ('OvertimeID',sql.Int, overtimeID)
        .query("DELETE FROM Overtime WHERE OvertimeID=@OvertimeID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}

// Updteee
export const updateOvertimeService = async (overtime) => {
    const {OvertimeID, EmployeeID, AttendanceID, OvertimeHours, OvertimeEarnings } = overtime;
        //  console.log(employee)
    try {
      const result = await poolRequest()         
        .input("OvertimeID", sql.Int, OvertimeID)
        .input("EmployeeID", sql.Int, EmployeeID)
        .input("AttendanceID", sql.Int, AttendanceID)
        .input("OvertimeHours", sql.Int,OvertimeHours)
        .input("OvertimeEarnings", sql.Decimal(10,2), OvertimeEarnings)
        .query(
          `UPDATE Overtime 
           SET OvertimeHours= @OvertimeHours, OvertimeEarnings= @OvertimeEarnings
           where EmployeeID = @EmployeeID`
          );
      return result;
    } catch (error) {
        console.error("Error updating Overtime:", error);
      return error;
    }
  };


