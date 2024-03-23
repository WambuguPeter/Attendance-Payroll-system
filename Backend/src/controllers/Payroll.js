import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess, checkIfValuesIsEmptyNullUndefined} from "../helper/helperFunctions.js";     
import { response } from "express";
import { addPayrollService, deletePayRollService, getAllPayrollsService, getPayrollByEmpIDService, getPayrollByIDService, updatePayrollService } from "../services/Payroll.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

const checkPayroll = async (req) => {
  const payrollID = Number(req.params.PayrollID);
  const payroll = await getPayrollByIDService(payrollID);
  if (payroll.length == 0 || payroll.message) {
      return false;
  } else {
      return true;
  }
}


//Adding Payroll

export const addPayrollController = async (req, res) => {
  try {
      const { EmployeeID } = req.body;
console.log(EmployeeID)
      // Call addPayrollService function with the EmployeeID
      const result = await addPayrollService({ EmployeeID });

      // Check if the result is an error
      if (result instanceof Error) {
          throw result;
      }

      // Check if the payroll was successfully added
      if (!result.error && result.rowsAffected && result.rowsAffected[0] === 1) {
          // Send success response if payroll was created successfully
          res.status(201).json({ success: true, message: "Payroll created successfully" });
      } else {
          // Send error response if there was a problem creating the payroll
          res.status(500).json({ success: false, message: "Failed to create payroll" });
      }
  } catch (error) {
      // Send error response if an error occurred during processing
      res.status(500).json({ success: false, error: error.message });
  }
}



// Get all
export const getAllPayrollsController = async (req,res) => {
    try {
        const data = await getAllPayrollsService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Payroll");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

//get by Empid
export const getPayrollByEmpIDController = async (req, res) => {
    try {
      const employeeID = Number(req.params.EmployeeID);
      const payroll = await getPayrollByEmpIDService(employeeID);
  
      if (payroll.length != 0) {
        return res.status(200).json(payroll);
      } else {
        return res.status(404).json({ error: "Payroll not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };

//get by id
export const getPayrollByIDController = async (req, res) => {
    try {
      const payrollID = Number(req.params.PayrollID);
      const payroll = await getPayrollByIDService(payrollID);
  
      if (payroll.length != 0) {
        return res.status(200).json(payroll);
      } else {
        return res.status(404).json({ error: "Payroll not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  //delete

  export const deletePayrollIContollor = async (req, res) => {
    try {
        const payrollID = Number(req.params.PayrollID);
        if (await checkPayroll(req)) {
            const result = await deletePayRollService(payrollID);
            if (result && result.message) {
                return res.status(500).send({ "error": result.message });
            } else {
                return sendDeleteSuccess(res, 'Payroll deleted successfully');
            }
        } else {
            return sendNotFound(res, 'Payroll not found');
        }
  
    } catch (error) {
        sendServerError(res, error.message);
    }
  }


//update

  export const updatePayrollController = async (req, res) => {
    try {
      const payrollID = Number(req.params.PayrollID);
      const exists = await checkPayroll(req);

      if (!exists){
        return res.status(404).json({ message: "Payroll not found" });
      }
      
      const payrollData = await getPayrollByIDService(payrollID);
      // console.log(employeeData)
     
      const updatedPayrollData ={ ...payrollData[0], ...req.body };
      updatedPayrollData.PayrollID =payrollID;
      // console.log(employeeID)

      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
            const {PayrollDate, EmployeeID, GrossPay, TotalDeductions, NetPay } = req.body;
            if (PayrollDate) {
              updatedPayrollData.PayrollDate = PayrollDate;
            }
            if (EmployeeID) {
              updatedPayrollData.EmployeeID = EmployeeID;
            }
            if (GrossPay) {
              updatedPayrollData.GrossPay = GrossPay;
            }
            if (TotalDeductions) {
              updatedPayrollData.TotalDeductions = TotalDeductions;
            }
            if (NetPay) {
              updatedPayrollData.NetPay = NetPay;
            }
            const updatedPayroll = await updatePayrollService(updatedPayrollData);
            if (updatedPayroll && updatedPayroll.rowsAffected && updatedPayroll.rowsAffected[0] > 0) {
              return res.status(200).json({ message: "Payroll updated successfully" });
            } else {
              return res.status(500).json({ error: "Failed to update Payroll" });
          }}
        } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  }

  