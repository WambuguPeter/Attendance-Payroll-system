import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Attendance
export const getAllAttendancesService = async () =>{
    try {
        const result = await poolRequest()
        .query(`
        SELECT Attendances.*, Employees.*
                FROM Attendances
                JOIN Employees ON Employees.EmployeeID = Attendances.EmployeeID
                
        `);
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


//get Attendances by Id
export const getAttendanceByIDService = async (attendanceID) =>{
    try {
        const result = await poolRequest()
        .input("AttendanceID", sql.Int, attendanceID)
        .query(`
        SELECT Attendances.*, Employees.*
                FROM Attendances
                JOIN Employees ON Employees.EmployeeID = Attendances.EmployeeID
                WHERE AttendanceID = @AttendanceID
                
        `);
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


//Add new Attendance

export const addAttendanceService = async (newAttendance) => {
    try {
        const result = await poolRequest()
        .input("EmployeeID", sql.Int, newAttendance.EmployeeID)
        .input("Date", sql.Date, newAttendance.Date)
        .input("ScheduleID", sql.Int, newAttendance.ScheduleID)
        .input("TimeIn", sql.VarChar(255), newAttendance.TimeIn)
        .input("TimeOut", sql.VarChar(255), newAttendance.TimeOut)
        .input("Hours", sql.VarChar(255), newAttendance.Hours)
       
        .query(
            `INSERT INTO Attendances (EmployeeID, Date, ScheduleID, TimeIn, Hours)
            VALUES (@EmployeeID, @Date, @ScheduleID, @TimeIn, @Hours)`
        );
        return result;
        
    } catch (error) {
        return error;
    }

}



//delete

export const deleteAttendanceService = async (attendanceID) => {
    try {
        const result = await poolRequest()
        .input ('AttendanceID',sql.Int, attendanceID)
        .query("DELETE FROM Attendances WHERE AttendanceID=@AttendanceID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}

// Updteee
export const updateAttendanceService = async (attendance) => {
    const { AttendanceID, EmployeeID, Date, ScheduleID, TimeIn, Hours} = attendance;
        //  console.log(employee)
    try {
      const result = await poolRequest()         
        .input("AttendanceID", sql.Int, AttendanceID)
        .input("EmployeeID", sql.Int, EmployeeID)
        .input("Date", sql.VarChar, Date)
        .input("ScheduleID", sql.Int, ScheduleID)
        .input("TimeIn", sql.VarChar, TimeIn)
        .input("Hours", sql.VarChar, Hours)
        .query(
          `UPDATE Attendances 
           SET EmployeeID= @EmployeeID, Date= @Date, ScheduleID= @ScheduleID, TimeIn= @TimeIn, Hours= @Hours
           where AttendanceID = @AttendanceID`
          );
      return result;
    } catch (error) {
        console.error("Error updating Attendances:", error);
      return error;
    }
  };


