import express, { Request, Response } from "express";
import { PrismaScheduleRepository } from "./schedules/infra/repositories/PrismaScheduleRepository";
import { FindByIdScheduleService } from "./schedules/domain/services/FindByIdScheduleService";
import { CreateScheduleService } from "./schedules/domain/services/CreateScheduleService";
import { ScheduleController } from "./app/controllers/ScheduleController";
import scheduleRoutes from "./app/routes/scheduleRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/schedules', scheduleRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});