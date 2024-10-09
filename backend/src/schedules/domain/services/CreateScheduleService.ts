import cron from "node-cron";
import { Schedule } from "../entities/Schedule";
import { CreateScheduleServiceInterface } from "../interfaces/CreateScheduleServiceInterface";
import { ScheduleRepository } from "../ports/ScheduleRepository";

export class CreateScheduleService {
  private jobs: Map<string, cron.ScheduledTask> = new Map();
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

    const [hourCron, minuteCron] = hour.split(':');
    const cronExpression = `1 ${minuteCron} ${hourCron} ${dayOfMonth} ${month} ${dayOfWeek}`;

    if (this.jobs.has(name)) {
      console.log(`A tarefa ${name} já está agendada`);
      return;
    }

    const job = cron.schedule(cronExpression, () => {
      console.log(`Executando tarefa agendada ${name}`);
      job.stop();
      this.jobs.delete(name);
    });

    this.jobs.set(name, job);
    console.log(`Tarefa ${name} agendada para ${cronExpression}`);
  }
}