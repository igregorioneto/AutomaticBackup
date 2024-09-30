import { Schedule } from "../entities/Schedule";
import { CreateScheduleServiceInterface } from "../interfaces/CreateScheduleServiceInterface";
import { ScheduleRepository } from "../ports/ScheduleRepository";

export class CreateScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute({ 
    name, 
    hour, 
    dayOfMonth,
    month,
    dayOfWeek
  }: CreateScheduleServiceInterface
  ) {
    const schedule = new Schedule(
      name, 
      hour, 
      undefined,
      dayOfMonth,
      month,
      dayOfWeek
    )
    await this.scheduleRepository.create(schedule);
  }
}