import { AutomationSchedulesCronExecService } from "./AutomationSchedulesCronExecService";

export class ExecuteSchedulesService {
  constructor(
    private readonly automationSchedulesCronExecService: AutomationSchedulesCronExecService
  ) { }

  async execute() {
    try {
      await this.automationSchedulesCronExecService.execute();
    } catch (error) {
      console.error(`Erro ao executar schedules: `, error);
    }
  }
}