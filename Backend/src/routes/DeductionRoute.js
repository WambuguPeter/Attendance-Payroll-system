import { Router } from "express";
import { getAllDeductionsController, getDeductionsByIDController } from "../controllers/DeductionController.js";


const deductionRoute =  Router();

deductionRoute.get("/Deduction/getAll", getAllDeductionsController);
deductionRoute.get("/Deduction/getDeductionByID/:DeductionID", getDeductionsByIDController);

export default deductionRoute;