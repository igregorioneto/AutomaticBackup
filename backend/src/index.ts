import express, { Request, Response } from "express";
import cors from "cors";
import scheduleRoutes from "./app/routes/scheduleRoutes";
import backupRoutes from "./app/routes/backupRoutes";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/schedules', scheduleRoutes);
app.use('/backups', backupRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});