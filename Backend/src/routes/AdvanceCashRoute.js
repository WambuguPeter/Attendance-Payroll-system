import { Router } from "express";
import { addAdvanceCashController, deleteAdvanceCashContollor, getAdvanceCashByIDController, getAllAdvanceCashController } from "../controllers/AdvanceCashContrroller.js";

const advanceCashRoute = Router();

advanceCashRoute.get("/AdvanceCash/getAll", getAllAdvanceCashController);
advanceCashRoute.get("/AdvanceCash/getAdvanceCashByID/:AdvanceCashID", getAdvanceCashByIDController);
advanceCashRoute.post("/AdvanceCash/addAdvanceCash", addAdvanceCashController);
advanceCashRoute.delete("/AdvanceCash/deleteAdvanceCashByID/:AdvanceCashID", deleteAdvanceCashContollor);

export default advanceCashRoute;