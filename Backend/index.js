import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from "./src/utils/logger.js"

import userRouter from "./src/routes/UserRoutes.js";
import scheduleRouter from "./src/routes/ScheduleRoutes.js";
import positionRoute from "./src/routes/PositionRoutes.js";
import payrollRoute from "./src/routes/PayrollRoute.js";
import deductionRoute from "./src/routes/DeductionRoute.js";
import advanceCashRoute from "./src/routes/AdvanceCashRoute.js";
import ovetimeRoute from "./src/routes/OvertimeRoute.js";
import attendanceRoute from "./src/routes/AttendanceRoute.js";
import leavesRoute from "./src/routes/LeavesRoute.js";


dotenv.config();
const port = process.env.API_PORT || 5000;
const app = express();
var corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  optionsSuccessStatus: 200, 
};



// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

// routes
app.use("/api", userRouter);
app.use('/api', scheduleRouter);
app.use('/api', positionRoute);
app.use('/api',payrollRoute);
app.use('/api',deductionRoute);
app.use('/api',advanceCashRoute);
app.use('/api',ovetimeRoute);
app.use('/api',attendanceRoute);
app.use('/api',leavesRoute);


app.listen(port, () => {
    logger.info(`Attendance and Payroll System running on http://localhost:${port}`);
})
