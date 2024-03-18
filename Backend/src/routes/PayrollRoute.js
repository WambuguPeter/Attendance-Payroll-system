import { Router } from "express";
import { getAllPayrollsController, getPayrollByIDController } from "../controllers/Payroll.js";

const payrollRoute = Router();

payrollRoute.get("/payroll/getAll", getAllPayrollsController);
payrollRoute.get("/payroll/getpayrollByID/:PayrollID", getPayrollByIDController);


export default payrollRoute;