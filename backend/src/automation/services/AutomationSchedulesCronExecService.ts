import { FindAllScheduleService } from "../../schedules/domain/services/FindAllScheduleService";

export class AutomationSchedulesCronExecService {
  constructor(
    private readonly findAllScheduleService: FindAllScheduleService
  ) { }

  async execute() {
    const schedules = await this.findAllScheduleService.execute() || [];
    for (const schedule of schedules) {
      console.log(`Tarefa ${schedule.name} agendada!`);
    }
  }
}