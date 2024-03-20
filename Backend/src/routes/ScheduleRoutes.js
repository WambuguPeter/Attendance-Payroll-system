import { Router } from "express";
import { addScheduleController, deleteSchedule, getAllSchedulesController, 
    getScheduleByIDController, 
    updateScheduleController} from "../controllers/ScheduleController.js";

// import { verifyToken } from "../middlewares/VerifyToken.js";

const scheduleRouter = Router();

scheduleRouter.get('/Schedules/getAll', getAllSchedulesController);
scheduleRouter.get('/Schedules/getScheduleByID/:ScheduleID', getScheduleByIDController);
scheduleRouter.post('/Schedules/addSchedule', addScheduleController);
scheduleRouter.put('/Schedules/updateScheduleByID/:ScheduleID', updateScheduleController);
scheduleRouter.delete('/Schedules/deleteSchedule/:ScheduleID', deleteSchedule);

export default scheduleRouter;