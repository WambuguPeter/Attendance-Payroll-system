import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Get all AdvanceCash
export const getAllAdvanceCashService = async () =>{
    try {
        const result = await poolRequest()
        .query(`SELECT A.*, E.*
         FROM AdvanceCash A
         JOIN
         Employees E ON E.EmployeeID = A.EmployeeID
         `);
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
        .query("SELECT * FROM AdvanceCash WHERE AdvanceCashID= @AdvanceCashID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


//Add new AdvanceCash 

export const addAdvanceCashService = async (newAdvanceCash ) => {
    try {
        // Get the current date
        const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

        const result = await poolRequest()
        .input("EmployeeID", sql.Int, newAdvanceCash.EmployeeID)
        .input("Date", sql.VarChar(255), currentDate)
        .input("Description", sql.VarChar(255), newAdvanceCash.Description)
        .input("AdvanceAmount", sql.Decimal(10, 2), newAdvanceCash.AdvanceAmount)       
        .query(
            `INSERT INTO AdvanceCash (EmployeeID, Date, Description, AdvanceAmount)
            VALUES (@EmployeeID, @Date, @Description, @AdvanceAmount)`
        );
        return result;
        
    } catch (error) {
        return error;
    }

}



//delete

export const deleteAdvanceCashService = async (advanceCashID) => {
    try {
        const result = await poolRequest()
        .input ('AdvanceCashID',sql.Int, advanceCashID)
        .query("DELETE FROM AdvanceCash WHERE AdvanceCashID=@AdvanceCashID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}

// Updteee
export const updatePositionService = async (position) => {
    const { PositionID, Title, BasicSalary, OvertimeRate} = position;
        //  console.log(employee)
    try {
      const result = await poolRequest()         
        .input("PositionID", sql.Int, PositionID)
        .input("Title", sql.VarChar, Title)
        .input("BasicSalary", sql.VarChar, BasicSalary)
        .input("OvertimeRate", sql.VarChar, OvertimeRate)
        .query(
          `UPDATE Positions 
           SET Title= @Title, BasicSalary= @BasicSalary, OvertimeRate= @OvertimeRate
           where PositionID =@PositionID`
          );
      return result;
    } catch (error) {
        console.error("Error updating position:", error);
      return error;
    }
  };

