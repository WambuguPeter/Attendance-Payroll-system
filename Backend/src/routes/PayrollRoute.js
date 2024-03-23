import { Router } from "express";
import { addPayrollController, deletePayrollIContollor,
     getAllPayrollsController, getPayrollByEmpIDController, getPayrollByIDController, updatePayrollController } from "../controllers/Payroll.js";

const payrollRoute = Router();

payrollRoute.get("/payroll/getAll", getAllPayrollsController);
payrollRoute.get("/payroll/getpayrollByID/:PayrollID", getPayrollByIDController);
payrollRoute.get("/payroll/getpayrollByEmpID/:EmployeeID", getPayrollByEmpIDController);
payrollRoute.post("/payroll/addpayroll", addPayrollController);
// payrollRoute.post("/payroll/addpayrollByID/:EmployeeID", addPayrollController);
payrollRoute.put("/payroll/UpdatepayrollByID/:PayrollID", updatePayrollController );
payrollRoute.delete("/payroll/deletepayrollByID/:PayrollID", deletePayrollIContollor);


export default payrollRoute;