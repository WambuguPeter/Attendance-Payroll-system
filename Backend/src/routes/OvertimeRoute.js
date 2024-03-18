import { Router } from "express";
import { getAllOvertimesController, getOvertimeByIDController } from "../controllers/OvertimeController.js";


const ovetimeRoute =  Router();

ovetimeRoute.get("/ovetime/getAll", getAllOvertimesController);
ovetimeRoute.get("/ovetime/getovetimeByID/:OvetimeID", getOvertimeByIDController);

export default ovetimeRoute;