import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();

const checkExistingAttendanceRecord = async (employeeID, date) => {
    try {
        
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .input("Date", sql.Date, date)
            .query(
                `SELECT * FROM Attendances WHERE EmployeeID = @EmployeeID AND Date = @Date`
            );

        return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
        throw error;
    }
}

const insertAttendanceRecord = async (attendanceData) => {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'

        const result = await poolRequest()
            .input("EmployeeID", sql.Int, attendanceData.EmployeeID)
            .input("Date", sql.Date, formattedDate) 
            .input("TimeIn", sql.VarChar, attendanceData.TimeIn)
            .query(
                `INSERT INTO Attendances (EmployeeID, Date, TimeIn) VALUES (@EmployeeID, @Date, @TimeIn)`
            );

        return result;
    } catch (error) {
        throw error;
    }
}



const updateAttendanceHoursAndOvertime = async (attendanceID, hours, minutes, overtime) => {
    try {
        const result = await poolRequest()
            .input("AttendanceID", sql.Int, attendanceID)
            .input("Hours", sql.VarChar(255), `${hours}:${minutes}`)
            .input("Overtime", sql.VarChar(3), overtime)
            .query(
                `UPDATE Attendances SET Hours = @Hours, Overtime = @Overtime WHERE ID = @AttendanceID`
            );

        return result;
    } catch (error) {
        throw error;
    }
}


export const addAttendanceService = async (newAttendance) => {
    try {
        const existingRecord = await checkExistingAttendanceRecord(newAttendance.EmployeeID, newAttendance.Date);

        if (!existingRecord) {
            return await insertAttendanceRecord(newAttendance);
        } else {
            throw new Error("Attendance record already exists for the employee and date.");
        }
    } catch (error) {
        throw error;
    }
}

export const updateAttendanceService = async (updatedAttendance) => {
    try {
        const existingRecord = await checkExistingAttendanceRecord(updatedAttendance.EmployeeID, updatedAttendance.Date);

        if (existingRecord) {
            return await updateAttendanceRecord(updatedAttendance,existingRecord);
        } else {
            throw new Error("No attendance record found for the employee and date.");
        }
    } catch (error) {
        throw error;
    }
}


const updateAttendanceRecord = async (attendanceData,existingRecord) => {
    try {
        const timeIn = new Date(existingRecord.TimeIn); 
        console.log('timeIn', timeIn)
        const timeOut = new Date(attendanceData.TimeOut); 
       console.log('timeOut', timeOut)

        const timeDifference = timeOut.getTime() - timeIn.getTime(); // Difference in milliseconds
        console.log('timeDifference', timeDifference)

        const hours = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining milliseconds to minutes

        const totalHours = hours + (minutes / 60);
        // console.log(totalHours);

        const overtimeHours = totalHours - 6; 
        const overtimeMinutes = minutes - (6 * 60); 

        const overtimeRecordedHours = Math.floor(overtimeHours); 
        const overtimeRecordedMinutes = Math.round(overtimeMinutes); 

        const overtimeFormatted = `${overtimeRecordedHours} hours and ${overtimeRecordedMinutes} minutes`;

        const result = await poolRequest()
            .input("AttendanceID", sql.Int, attendanceData.AttendanceID)
            .input("TimeOut", sql.VarChar, attendanceData.TimeOut)
            .input("Hours", sql.Decimal(10, 2), totalHours) 
            .input("Overtime", sql.VarChar(50), overtimeFormatted)  
            .query(
                `UPDATE Attendances 
                 SET TimeOut = @TimeOut, Hours = @Hours, Overtime = @Overtime 
                 WHERE AttendanceID = @AttendanceID`
            );

        return result;
    } catch (error) {
        throw error;
    }
}




//Add new Attendance

export const addAttendanceService1 = async (newAttendance) => {
    try {
        const result = await poolRequest()
        .input("EmployeeID", sql.Int, newAttendance.EmployeeID)
        .input("Date", sql.Date, newAttendance.Date)
        .input("ScheduleID", sql.Int, newAttendance.ScheduleID)
        .input("TimeIn", sql.VarChar, newAttendance.TimeIn)
        .input("TimeOut", sql.VarChar, newAttendance.TimeOut)
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


//get Attendances by empoyeee Id
export const getAttendByEmpIDService = async (employeeID) =>{
    try {
        const result = await poolRequest()
        .input("EmployeeID", sql.Int, employeeID)
        .query(`
        SELECT Attendances.*, Employees.*
                FROM Attendances
                JOIN Employees ON Employees.EmployeeID = Attendances.EmployeeID
                WHERE Attendances.EmployeeID= @EmployeeID;
                
        `);
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};







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
export const updateAttendanceService1 = async (attendance) => {
    const { AttendanceID, EmployeeID, Date, ScheduleID, TimeIn, Hours} = attendance;
        //  console.log(employee)
    try {
      const result = await poolRequest()         
        .input("AttendanceID", sql.Int, AttendanceID)       
        .input("TimeOut", sql.VarChar, TimeOut)
        .input("Hours", sql.VarChar, Hours)
        .query(
          `UPDATE Attendances 
           SET  TimeOut= @TimeOut, Hours= @Hours
           where AttendanceID = @AttendanceID`
          );
      return result;
    } catch (error) {
        console.error("Error updating Attendances:", error);
      return error;
    }
  };

  
// // Updteee
// export const updateAttendanceService = async (attendance) => {
//     const { AttendanceID, EmployeeID, Date, ScheduleID, TimeIn, Hours} = attendance;
//         //  console.log(employee)
//     try {
//       const result = await poolRequest()         
//         .input("AttendanceID", sql.Int, AttendanceID)
//         .input("EmployeeID", sql.Int, EmployeeID)
//         .input("Date", sql.Date, Date)
//         .input("ScheduleID", sql.Int, ScheduleID)
//         .input("TimeIn", sql.VarChar, TimeIn)
//         .input("TimeOut", sql.VarChar, TimeIn)
//         .input("Hours", sql.VarChar, Hours)
//         .query(
//           `UPDATE Attendances 
//            SET EmployeeID= @EmployeeID, Date= @Date, ScheduleID= @ScheduleID, TimeIn= @TimeIn, TimeOut= @TimeOut, Hours= @Hours
//            where AttendanceID = @AttendanceID`
//           );
//       return result;
//     } catch (error) {
//         console.error("Error updating Attendances:", error);
//       return error;
//     }
//   };

