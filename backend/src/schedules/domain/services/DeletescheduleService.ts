import { ScheduleRepository } from "../ports/ScheduleRepository";

export class DeleteScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(id: number) {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new Error('Schedule not found!');
    }
    await this.scheduleRepository.delete(id);
  }
}