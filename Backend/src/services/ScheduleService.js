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


//Add new Schedule

export const addScheduleService = async (newSchedule) => {
    try {
        const result = await poolRequest()
        .input("ScheduleName", sql.VarChar(255), newSchedule.ScheduleName)
        .input("StartTime", sql.VarChar(255), newSchedule.StartTime)
        .input("EndTime", sql.VarChar(255), newSchedule.EndTime)
        .input("Hours", sql.VarChar(255), newSchedule.Hours)       
        .query(
            `INSERT INTO Positions (ScheduleName, StartTime, EndTime, Hours)
            VALUES (@ScheduleName, @StartTime, @EndTime, @Hours)`
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
        // console.log("ScheduleID at delete sevice",scheduleID)
        const result = await poolRequest()
        .input ('ScheduleID',sql.Int, scheduleID)
        .query("DELETE FROM Schedules WHERE ScheduleID=@ScheduleID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}


export const updateScheduleService = async (schedule) => {
    const { ScheduleID, ScheduleName, StartTime, EndTime, Hours } = schedule;
    try {
      const result = await poolRequest()
        .input("ScheduleID", sql.Int, ScheduleID)
        .input("ScheduleName", sql.VarChar, ScheduleName)
        .input("StartTime", sql.VarChar, StartTime)
        .input("EndTime", sql.VarChar, EndTime)
        .input("Hours", sql.VarChar, Hours)
        .query(
          `UPDATE Schedules
           SET ScheduleName=@ScheduleName, StartTime=@StartTime, EndTime=@EndTime, Hours=@Hours WHERE ScheduleID=@ScheduleID`
        );
      return result;
    } catch (error) {
      return error;
    }
  };