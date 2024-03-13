import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();

//Get all Users
export const getAllUserService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Employees");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};

export const getUserByEmailService = async (Email) =>{
    try {
        const result = await poolRequest()
        .input("Email", sql.VarChar(255),  Email)
        .query("SELECT * FROM Employees WHERE Email= @Email" );
        return result.recordset[0];        
    } catch (error) {
        return error.message;
    }
};