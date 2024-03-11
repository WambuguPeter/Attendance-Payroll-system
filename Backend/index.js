import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from "./src/utils/logger";

dotenv.config();
const port = process.env.API_PORT || 3000;
const app = express();
var corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

// routes



app.listen(port, () => {
    logger.info(`Attendance and Payroll Manager running on http://localhost:${port}`);
})
