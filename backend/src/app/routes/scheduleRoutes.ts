import { Router } from "express";
import { PrismaScheduleRepository } from "../../schedules/infra/repositories/PrismaScheduleRepository";
import { FindByIdScheduleService } from "../../schedules/domain/services/FindByIdScheduleService";
import { CreateScheduleService } from "../../schedules/domain/services/CreateScheduleService";
import { ScheduleController } from "../controllers/ScheduleController";
import { FindAllScheduleService } from "../../schedules/domain/services/FindAllScheduleService";

const router = Router();

const prismaScheduleRepository = new PrismaScheduleRepository();
const findAllScheduleService = new FindAllScheduleService(prismaScheduleRepository);
const findByIdScheduleService = new FindByIdScheduleService(prismaScheduleRepository);
const createScheduleService = new CreateScheduleService(prismaScheduleRepository);
const scheduleController = new ScheduleController(
  findByIdScheduleService,
  createScheduleService,
  findAllScheduleService
);

router.get('/', async (req, res, next) => {
  try {
    await scheduleController.findAll(req, res);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    await scheduleController.findById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await scheduleController.create(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;