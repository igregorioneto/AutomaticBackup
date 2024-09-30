import { ScheduleRepository } from "../ports/ScheduleRepository";

export class FindByIdScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(id: number) {
    const schedule = await this.scheduleRepository.findById(id);
    if(!schedule) {
      throw new Error("Schedule not found");
    }
    return schedule;
  }
}