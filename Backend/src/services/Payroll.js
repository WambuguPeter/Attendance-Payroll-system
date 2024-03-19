import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();


//Add new Payroll

export const addPayrollService = async (newPayroll) => {
    try {
        const result = await poolRequest()
        .input("PayrollDate", sql.VarChar(255), newPayroll.PayrollDate)
        .input("EmployeeID", sql.Int, newPayroll.EmployeeID)
        .input("GrossPay", sql.VarChar(255), newPayroll.GrossPay)
        .input("TotalDeductions", sql.VarChar(255), newPayroll.TotalDeductions)
        .input("NetPay", sql.VarChar(255), newPayroll.NetPay)
       
        .query(
            `INSERT INTO Payrolls (PayrollDate, EmployeeID, GrossPay, TotalDeductions, NetPay)
            VALUES (@PayrollDate, @EmployeeID, @GrossPay, @TotalDeductions ,@NetPay)`
        );
        return result;
        
    } catch (error) {
        return error;
    }

}



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
export const getPayrollByIDService = async (payrollID) =>{
    try {
        const result = await poolRequest()
        .input("PayrollID", sql.Int,  payrollID)
        .query("SELECT * FROM Payrolls WHERE PayrollID= @PayrollID");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


// Delete PayRoll

export const deletePayRollService = async (payrollID) => {
    try {
        const result = await poolRequest()
        .input ('PayrollID',sql.Int, payrollID)
        .query("DELETE FROM Payrolls WHERE PayrollID=@PayrollID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}


export const updatePayrollService = async (payroll) => {
    const { PayrollID, PayrollDate, EmployeeID, GrossPay, TotalDeductions, NetPay} = payroll;
        //  console.log(employee)
    try {
      const result = await poolRequest()         
        .input("PayrollID", sql.Int, PayrollID)
        .input("PayrollDate", sql.Date, PayrollDate)
        .input("EmployeeID", sql.Int, EmployeeID)
        .input("GrossPay", sql.VarChar, GrossPay)
        .input("TotalDeductions", sql.VarChar, TotalDeductions)
        .input("NetPay", sql.VarChar, NetPay)
        .query(
          `UPDATE Payrolls 
           SET PayrollDate= @PayrollDate, EmployeeID= @EmployeeID, GrossPay= @GrossPay,  TotalDeductions= @TotalDeductions,  NetPay= @NetPay
           where PayrollID =@PayrollID`
          );
      return result;
    } catch (error) {
        console.error("Error updating payroll:", error);
      return error;
    }
  };




