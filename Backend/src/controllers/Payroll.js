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
export const addPayrollController = async (req, res) =>{
  const {
      PayrollDate, EmployeeID, GrossPay, TotalDeductions, NetPay
  } = req.body;
  // console.log(req.body);

  try {

      // const {error} = validateNewpayroll({
      //     PayrollDate, EmployeeID, GrossPay, TotalDeductions, NetPay
      // });

      // if (error){
      //     // return res.status(400).send(error.details.message);
      //     return res.status(400).send(error.details[0].message);
      // }
      // const PayrollDate = String(req.params.PayrollDate);
      // console.log(PayrollDate)
      // const existingPosition = await getPositionByPayrollDateService(PayrollDate);

      // if (existingPosition) {
      //     return res.status(400).json({ error : "Position already exists"});
      //     // console.log("Use in the syste alredy");
      // }
      
      const newPayroll = {
        PayrollDate, EmployeeID, GrossPay, TotalDeductions, NetPay 
      }
      // console.log(newPayroll);

      const response = await addPayrollService(newPayroll);

      if (response instanceof Error){
          throw response;
      }

      if (response.rowsAffected && response.rowsAffected[0] === 1) {
          sendCreated(res, "Payroll created successfully");
        } else {
          sendServerError(res, "Failed to create Payroll");
        }
  } catch (error) {
      sendServerError(res, error.message);
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

  