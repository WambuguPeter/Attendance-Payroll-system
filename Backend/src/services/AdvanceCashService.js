import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all AdvanceCash
export const getAllAdvanceCashService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM AdvanceCash");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get AdvanceCashs by Id
export const getAdvanceCashByIDService = async (AdvanceCashID) =>{
    try {
        const result = await poolRequest()
        .input("AdvanceCashID", sql.Int,  AdvanceCashID)
        .query("SELECT * FROM Positions WHERE AdvanceCashID= @AdvanceCashID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


