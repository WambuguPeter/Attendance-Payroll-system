import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all Payrolls
export const getAllPayrollsService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Payrolls");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};




//get Payrolls by Id
export const getPayrollByIDService = async (PayrollID) =>{
    try {
        const result = await poolRequest()
        .input("PayrollID", sql.Int,  PayrollID)
        .query("SELECT * FROM Payrolls WHERE PayrollID= @PayrollID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


