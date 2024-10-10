import cron from "node-cron";
import { FindAllScheduleService } from "../../schedules/domain/services/FindAllScheduleService";

export class AutomationSchedulesCronExecService {
  private jobs: Map<string, cron.ScheduledTask> = new Map();
  constructor(
    private readonly findAllScheduleService: FindAllScheduleService
  ) { }

  async execute() {
    const schedules = await this.findAllScheduleService.execute() || [];
    for (const schedule of schedules) {
      const [hourCron, minuteCron] = schedule.hour.split(':');
      const cronExpression = `1 ${minuteCron} ${hourCron} ${schedule.dayOfMonth ?? '*'} ${schedule.month ?? '*'} ${schedule.dayOfWeek ?? '*'}`;

      if (this.jobs.has(schedule.name)) {
        console.log(`A tarefa ${schedule.name} já esta agendada!`);
      }

      const job = cron.schedule(cronExpression, () => {
        console.log(`Executando tarefa agendada ${schedule.name}`);
        job.stop();
        this.jobs.delete(schedule.name);
      });
      this.jobs.set(schedule.name, job);
      console.log(`Tarefa ${schedule.name} agendada para ${cronExpression}`);
    }
  }
}