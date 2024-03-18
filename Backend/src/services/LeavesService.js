import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Leaves
export const getAllLeavesService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Leaves");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get Leavess by Id
export const getLeaveByIDService = async (LeavesID) =>{
    try {
        const result = await poolRequest()
        .input("LeavesID", sql.Int,  LeavesID)
        .query("SELECT * FROM Leaves WHERE LeavesID= @LeavesID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


