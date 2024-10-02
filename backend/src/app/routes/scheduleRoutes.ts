import { Router } from "express";
import { PrismaScheduleRepository } from "../../schedules/infra/repositories/PrismaScheduleRepository";
import { FindByIdScheduleService } from "../../schedules/domain/services/FindByIdScheduleService";
import { CreateScheduleService } from "../../schedules/domain/services/CreateScheduleService";
import { ScheduleController } from "../controllers/ScheduleController";
import { FindAllScheduleService } from "../../schedules/domain/services/FindAllScheduleService";
import { UpdateScheduleService } from "../../schedules/domain/services/UpdateScheduleService";
import { DeleteScheduleService } from "../../schedules/domain/services/DeletescheduleService";

const router = Router();

const prismaScheduleRepository = new PrismaScheduleRepository();
const findAllScheduleService = new FindAllScheduleService(prismaScheduleRepository);
const findByIdScheduleService = new FindByIdScheduleService(prismaScheduleRepository);
const createScheduleService = new CreateScheduleService(prismaScheduleRepository);
const updateScheduleService = new UpdateScheduleService(prismaScheduleRepository);
const deleteScheduleService = new DeleteScheduleService(prismaScheduleRepository);
const scheduleController = new ScheduleController(
  findByIdScheduleService,
  createScheduleService,
  findAllScheduleService,
  updateScheduleService,
  deleteScheduleService
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

router.put('/:id', async (req, res, next) => {
  try {
    await scheduleController.update(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await scheduleController.delete(req, res);
  } catch (error) {
    next(error);
  }
})

export default router;