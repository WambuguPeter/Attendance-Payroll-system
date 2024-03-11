import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from "../Backend/src/utils/dbConnect.js";
import logger from "./src/utils/logger.js"

dotenv.config();
const port = process.env.API_PORT || 5000;
const app = express();
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200, 
};

// Connect to the database
connectToDatabase();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

// routes

app.listen(port, () => {
    logger.info(`Attendance and Payroll System running on http://localhost:${port}`);
})
