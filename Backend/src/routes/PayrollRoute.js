import { Router } from "express";
import { addPayrollController, deletePayrollIContollor,
     getAllPayrollsController, getPayrollByIDController, updatePayrollController } from "../controllers/Payroll.js";

const payrollRoute = Router();

payrollRoute.get("/payroll/getAll", getAllPayrollsController);
payrollRoute.get("/payroll/getpayrollByID/:PayrollID", getPayrollByIDController);
payrollRoute.post("/payroll/addpayroll", addPayrollController);
payrollRoute.put("/payroll/UpdatepayrollByID/:PayrollID", updatePayrollController );
payrollRoute.delete("/payroll/deletepayrollByID/:PayrollID", deletePayrollIContollor);


export default payrollRoute;