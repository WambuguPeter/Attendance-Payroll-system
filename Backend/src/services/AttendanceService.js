import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Attendance
export const getAllAttendancesService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Attendances");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


//get Attendances by Id
export const getAttendanceByIDService = async (AttendanceID) =>{
    try {
        const result = await poolRequest()
        .input("AttendanceID", sql.Int,  AttendanceID)
        .query("SELECT * FROM Attendances WHERE AttendanceID= @AttendanceID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


