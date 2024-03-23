import {poolRequest, sql} from '../utils/dbConnect.js'
import dotenv from "dotenv";

dotenv.config();

//fetch basic salary by EmployeeID
const fetchBasicSalary = async (employeeID) => {
    console.log('employeeID:', employeeID)
    try {
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .query(
                `SELECT Positions.BasicSalary 
                FROM Employees 
                JOIN
                Positions ON Positions.PositionID = Employees.PositionID
                WHERE EmployeeID= @EmployeeID`
            );
        
        // Extract basic salary from the result
        const basicSalary = result.recordset[0].BasicSalary;
        // console.log(basicSalary);
        return basicSalary;
    } catch (error) {
        throw error;
    }
}

// Function to fetch advance cash for a given EmployeeID
const fetchAdvanceCash = async (employeeID) => {
    try {
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .query(
                `SELECT AdvanceAmount FROM AdvanceCash WHERE EmployeeID = @EmployeeID`
            );
        
        // Extract advance cash from the result
        const advanceCash = result.recordset[0].AdvanceAmount;
        return advanceCash;
    } catch (error) {
        throw error;
    }
}

// Function to fetch overtime earnings for a given EmployeeID
const fetchOvertimeEarnings = async (employeeID) => {
    try {
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .query(
                `SELECT OvertimeEarnings FROM Overtime WHERE EmployeeID = @EmployeeID`
            );
        
        // Extract overtime earnings from the result
        const overtimeEarnings = result.recordset[0].OvertimeEarnings;
        return overtimeEarnings;
    } catch (error) {
        throw error;
    }
}

// Function to fetch deductions for a given EmployeeID
const fetchDeductions = async (employeeID) => {
    try {
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .query(
                `SELECT SUM(DeductionAmount) AS TotalDeductions FROM tbl_Deductions WHERE EmployeeID = @EmployeeID`
            );
        
        // Extract total deductions from the result
        const totalDeductions = result.recordset[0].TotalDeductions; 
        return totalDeductions;
    } catch (error) {
        throw error;
    }
}



//Add new Payroll

export const addPayrollService = async ({ EmployeeID }) => {
    console.log(EmployeeID)
    try {
        // Get the current date
        const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

        // Fetch basic salary, advance cash, overtime earnings, and deductions for the given EmployeeID
        const basicSalary = await fetchBasicSalary(EmployeeID);
        const advanceCash = await fetchAdvanceCash(EmployeeID);
        const overtimeEarnings = await fetchOvertimeEarnings(EmployeeID);
        const deductions = await fetchDeductions(EmployeeID);
        console.log('basicSalary', basicSalary);
        
        
        // Calculate GrossPay by adding basic salary and overtime earnings
        const grossPay = basicSalary + (overtimeEarnings || 0); // Ensure overtimeEarnings is 0 if it's null or undefined
        // console.log('grossPay', grossPay)

        // Calculate TotalDeductions by adding advance cash and all other deductions
        const totalDeductions = (advanceCash || 0) + (deductions || 0); // Ensure deductions is 0 if it's null or undefined

        // Calculate NetPay by subtracting TotalDeductions from GrossPay
        const netPay = grossPay - totalDeductions;

        // Insert the calculated values into the database
        const result = await poolRequest()
            .input("PayrollDate", sql.VarChar(255), currentDate) // Use current date
            .input("EmployeeID", sql.Int, EmployeeID)
            .input("GrossPay", sql.Decimal(10, 2), grossPay)
            .input("TotalDeductions", sql.Decimal(10, 2), totalDeductions)
            .input("NetPay", sql.Decimal(10, 2), netPay)
            .query(
                `INSERT INTO Payrolls (PayrollDate, EmployeeID, GrossPay, TotalDeductions, NetPay)
                VALUES (@PayrollDate, @EmployeeID, @GrossPay, @TotalDeductions, @NetPay)`
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
        .query(`
        SELECT Payrolls.*, E.*, P.*, A.AdvanceAmount, O.OvertimeEarnings, D.*
	FROM Payrolls 
	JOIN 
	Employees E ON E.EmployeeID = Payrolls.EmployeeID
	JOIN
	Positions P ON E.PositionID = P.PositionID
	JOIN
	AdvanceCash A ON E.EmployeeID = A.EmployeeID
	JOIN
	Overtime O ON E.EmployeeID = O.EmployeeID
	JOIN
	tbl_Deductions D ON E.EmployeeID = D.EmployeeID;
`);
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
};


//get Payrolls by Emp Id
export const getPayrollByEmpIDService = async (employeeID) =>{
    try {
        const result = await poolRequest()
        .input("EmployeeID", sql.Int,  employeeID)
        .query(`
        SELECT Payrolls.*, Employees.*
       FROM Payrolls
       JOIN Employees ON Employees.EmployeeID = Payrolls.EmployeeID
       WHERE Payrolls.EmployeeID = @EmployeeID
       `);
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
        .query(`
        SELECT Payrolls.*, Employees.*
       FROM Payrolls
       JOIN Employees ON Employees.EmployeeID = Payrolls.EmployeeID
       WHERE PayrollID = @PayrollID
       `);
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




