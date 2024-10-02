import { ScheduleRepository } from "../ports/ScheduleRepository";

export class FindAllScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute() {
    return await this.scheduleRepository.findAll();
  }
}