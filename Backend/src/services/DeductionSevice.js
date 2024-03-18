import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Deduction
export const getAllDeductionsService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Deductions");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get Deduction by Id
export const getDeductionByIDService = async (DeductionID) =>{
    try {
        const result = await poolRequest()
        .input("DeductionID", sql.Int,  DeductionID)
        .query("SELECT * FROM Positions WHERE DeductionID= @DeductionID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


