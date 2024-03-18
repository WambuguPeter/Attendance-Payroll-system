import { Router } from "express";
import { getAllLeavesController, getLeaveByIDController } from "../controllers/LeavesController.js";

const leavesRoute = Router();

leavesRoute.get("/leaves/getAll", getAllLeavesController);
leavesRoute.get("/leaves/getleavesByID/:leavesID", getLeaveByIDController);


export default leavesRoute;