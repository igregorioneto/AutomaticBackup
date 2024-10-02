import { Request, Response } from "express";
import { CreateScheduleService } from "../../schedules/domain/services/CreateScheduleService";
import { FindByIdScheduleService } from "../../schedules/domain/services/FindByIdScheduleService";
import { FindAllScheduleService } from "../../schedules/domain/services/FindAllScheduleService";

export class ScheduleController {
  constructor(
    private readonly findByIdScheduleService: FindByIdScheduleService,
    private readonly createScheduleService: CreateScheduleService,
    private readonly findAllScheduleService: FindAllScheduleService
  ) { }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.findAllScheduleService.execute();
      return res.status(200).send({ message: 'Find all schedule', data: result, success: true })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ message: error.name, success: false });
      }
      return res.status(500).send({ message: 'Unknown error', success: false });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) return res.status(401).send({ message: 'ID is required', success: false });
      const result = await this.findByIdScheduleService.execute(+id);
      return res.status(200).send({ data: result, message: 'Find schedule with success!', success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ message: error.message, success: false });
      } else {
        return res.status(500).send({ message: 'Unknown error', success: false });
      }
    }
  }

  async create(req: Request, res: Response) {
    const { name, hour, dayOfMonth, month, dayOfWeek } = req.body;
    try {
      if (!name || !hour) return res.status(401).send({ message: 'Name or Hour required!', success: false })
      await this.createScheduleService.execute({
        name,
        hour,
        dayOfMonth,
        dayOfWeek,
        month
      });
      return res.status(201).send({ message: 'Schedule created successfully', success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ message: error.message, success: false });
      }
      return res.status(500).send({ message: 'Unknown error', success: false });
    }
  }
}