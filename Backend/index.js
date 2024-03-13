import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
// import { connectToDatabase } from "../Backend/src/utils/dbConnect.js";
import logger from "./src/utils/logger.js"
import userRouter from "./src/routes/UserRoutes.js";


dotenv.config();
const port = process.env.API_PORT || 5000;
const app = express();
var corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  optionsSuccessStatus: 200, 
};


// Connect to the database
// connectToDatabase();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

// routes
app.use("/api", userRouter);


app.listen(port, () => {
    logger.info(`Attendance and Payroll System running on http://localhost:${port}`);
})
