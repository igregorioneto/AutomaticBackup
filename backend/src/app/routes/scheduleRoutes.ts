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

/**
 * @swagger
*   tags:
 *    - name: Schedules
 *      description: Endpoints related schedules management
 * /schedules:
 *  get:
 *    tags:
 *       - Schedules
 *    summary: Return Find All Schedules
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: Schedule 1
 *                  hour:
 *                    type: string
 *                    example: 11:30
 *                  dayOfMonth:
 *                    type: string
 *                    example: '*'
 *                  month:
 *                    type: string
 *                    example: '*'
 *                  dayOfWeek:
 *                    type: string
 *                    example: '0-6'
 */
router.get('/', async (req, res, next) => {
  try {
    await scheduleController.findAll(req, res);
  } catch (error) {
    next(error);
  }
})

/**
 * @swagger
*   tags:
 *    - name: Schedules
 *      description: Endpoints related schedules management
 * /schedules/{id}:
 *  get:
 *    tags:
 *       - Schedules
 *    summary: Return Schedules By ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: Schedule 1
 *                  hour:
 *                    type: string
 *                    example: 11:30
 *                  dayOfMonth:
 *                    type: string
 *                    example: '*'
 *                  month:
 *                    type: string
 *                    example: '*'
 *                  dayOfWeek:
 *                    type: string
 *                    example: '0-6'
 */
router.get('/:id', async (req, res, next) => {
  try {
    await scheduleController.findById(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /schedules:
 *  post:
 *    tags:
 *      - Schedules
 *    summary: Create a new schedule
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Schedule 1
 *              hour:
 *                type: string
 *                example: 11:30
 *              dayOfMonth:
 *                type: string
 *                nullable: true
 *                example: '*'
 *              month:
 *                type: string
 *                nullable: true
 *                example: '*'
 *              dayOfWeek:
 *                type: string
 *                nullable: true
 *                example: '0-6'
 *    responses:
 *      201:
 *        description: Schedule created successfully
 *      400:
 *        description: Invalid input
 */
router.post('/', async (req, res, next) => {
  try {
    await scheduleController.create(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /schedules/{id}:
 *  put:
 *    tags:
 *      - Schedules
 *    summary: Update an existing schedule by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: The ID of the schedule to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Schedule 1
 *              hour:
 *                type: string
 *                example: 11:30
 *              dayOfMonth:
 *                type: string
 *                nullable: true
 *                example: '*'
 *              month:
 *                type: string
 *                nullable: true
 *                example: '*'
 *              dayOfWeek:
 *                type: string
 *                nullable: true
 *                example: '0-6'
 *    responses:
 *      200:
 *        description: Schedule updated successfully
 *      404:
 *        description: Schedule not found
 *      400:
 *        description: Invalid input
 */
router.put('/:id', async (req, res, next) => {
  try {
    await scheduleController.update(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /schedules/{id}:
 *  delete:
 *    tags:
 *       - Schedules
 *    summary: Delete Schedule By ID
 *    responses:
 *      204:
 *        description: Schedule deleted successfully
 *      401:
 *        description: Schedule not found
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await scheduleController.delete(req, res);
  } catch (error) {
    next(error);
  }
})

export default router;