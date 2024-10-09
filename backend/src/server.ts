import express, { Request, Response } from "express";
import cors from "cors";
import scheduleRoutes from "./app/routes/scheduleRoutes";
import backupRoutes from "./app/routes/backupRoutes";
import { setupSwagger } from "./swagger";
import { FindAllScheduleService } from "./schedules/domain/services/FindAllScheduleService";
import { PrismaScheduleRepository } from "./schedules/infra/repositories/PrismaScheduleRepository";
import { ExecuteSchedulesService } from "./automation/services/ExecuteSchedulesService";
import { AutomationSchedulesCronExecService } from "./automation/services/AutomationSchedulesCronExecService";

const createServer = () => {
  const app = express();
  const port = 3000;

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/schedules', scheduleRoutes);
  app.use('/backups', backupRoutes);

  setupSwagger(app);

  const prismaScheduleRepository = new PrismaScheduleRepository();
  const findAllScheduleService = new FindAllScheduleService(prismaScheduleRepository);
  const automationSchedulesCronExecService = new AutomationSchedulesCronExecService(
    findAllScheduleService
  );
  const executeSchedulesService = new ExecuteSchedulesService(
    automationSchedulesCronExecService
  );

  return { app, executeSchedulesService, port };
};

export { createServer };