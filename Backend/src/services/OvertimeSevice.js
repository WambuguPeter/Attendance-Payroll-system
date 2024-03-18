import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Overtime
export const getAllOvertimesService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Overtime");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get Overtimes by Id
export const getOvertimeByIDService = async (OvertimeID) =>{
    try {
        const result = await poolRequest()
        .input("OvertimeID", sql.Int,  OvertimeID)
        .query("SELECT * FROM Overtime WHERE OvertimeID= @OvertimeID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


