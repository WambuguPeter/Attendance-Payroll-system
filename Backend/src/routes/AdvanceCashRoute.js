import { Router } from "express";
import { getAdvanceCashByIDController, getAllAdvanceCashController } from "../controllers/AdvanceCashContrroller.js";

const advanceCashRoute = Router();

advanceCashRoute.get("/AdvanceCash/getAll", getAllAdvanceCashController);
advanceCashRoute.get("/AdvanceCash/getAdvanceCashByID/:AdvanceCashID", getAdvanceCashByIDController);

export default advanceCashRoute;