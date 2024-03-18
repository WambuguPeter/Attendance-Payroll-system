import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Position
export const getAllPositionsService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Positions");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get Positions by Id
export const getPositionByIDService = async (PositionID) =>{
    try {
        const result = await poolRequest()
        .input("PositionID", sql.Int,  PositionID)
        .query("SELECT * FROM Positions WHERE PositionID= @PositionID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


