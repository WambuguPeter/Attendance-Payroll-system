import { Router } from "express";
import { deleteSchedule, getAllSchedulesController, 
    getScheduleByIDController } from "../controllers/ScheduleController.js";

// import { verifyToken } from "../middlewares/VerifyToken.js";

const scheduleRouter = Router();

scheduleRouter.get('/Schedules/getAll', getAllSchedulesController);
scheduleRouter.get('/Schedules/getScheduleByID/:ScheduleID', getScheduleByIDController);
scheduleRouter.delete('/Schedules/deleteSchedule/:ScheduleID', deleteSchedule);

export default scheduleRouter;