import { Router } from "express";
import { getAllPositionsController, getPositionsByIDController } from "../controllers/PositionControlers.js";

const positionRoute = Router();

positionRoute.get("/Positions/getAll", getAllPositionsController);
positionRoute.get("/Positions/getPositionByID/:PositionID", getPositionsByIDController);

export default positionRoute;