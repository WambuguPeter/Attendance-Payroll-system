import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();



//Add new Position

export const addPositionService = async (newPosition) => {
    try {
        const result = await poolRequest()
        .input("Title", sql.VarChar(255), newPosition.Title)
        .input("BasicSalary", sql.VarChar(255), newPosition.BasicSalary)
        .input("OvertimeRate", sql.VarChar(255), newPosition.OvertimeRate)
       
        .query(
            `INSERT INTO Positions (Title, BasicSalary, OvertimeRate)
            VALUES (@Title, @BasicSalary, @OvertimeRate)`
        );
        return result;
        
    } catch (error) {
        return error;
    }

}


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


export const getPositionByTitleService = async (Title) =>{
    try {
        const result = await poolRequest()
        .input("Title", sql.Int,  Title)
        .query("SELECT * FROM Positions WHERE Title= @Title");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


//delete

export const deletePositionService = async (positionID) => {
    try {
        const result = await poolRequest()
        .input ('PositionID',sql.Int, positionID)
        .query("DELETE FROM Positions WHERE PositionID=@PositionID");
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

