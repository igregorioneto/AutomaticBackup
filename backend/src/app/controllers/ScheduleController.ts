import { Request, Response } from "express";
import { CreateScheduleService } from "../../schedules/domain/services/CreateScheduleService";
import { FindByIdScheduleService } from "../../schedules/domain/services/FindByIdScheduleService";
import { FindAllScheduleService } from "../../schedules/domain/services/FindAllScheduleService";
import { UpdateScheduleService } from "../../schedules/domain/services/UpdateScheduleService";
import { DeleteScheduleService } from "../../schedules/domain/services/DeletescheduleService";

export class ScheduleController {
  constructor(
    private readonly findByIdScheduleService: FindByIdScheduleService,
    private readonly createScheduleService: CreateScheduleService,
    private readonly findAllScheduleService: FindAllScheduleService,
    private readonly updateScheduleService: UpdateScheduleService,
    private readonly deleteScheduleService: DeleteScheduleService
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

  async update(req: Request, res: Response) {
    const { name, hour, dayOfMonth, month, dayOfWeek } = req.body;
    const { id } = req.params;
    try {
      if (!id || !name || !hour) return res.status(401).send({ message: 'ID, Name or Hour required!', success: false })
      await this.updateScheduleService.execute({ 
        id: +id,
        updateScheduleInterface: { name, hour, dayOfMonth, month, dayOfWeek }
      });
      return res.status(201).send({ message: 'Update schedule successfully', success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({ message: error?.stack, success: false });
      }
      return res.status(500).send({ message: 'Unknown error', success: false });
    }    
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) return res.status(401).send({ message: 'ID required!', success: false });
      await this.deleteScheduleService.execute(+id);
      return res.status(204).send({ message: 'Schedule Deleted successfully', success: true });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({ message: error?.stack, success: false });
      }
      return res.status(500).send({ message: 'Unknown error', success: false });
    }
  }
}