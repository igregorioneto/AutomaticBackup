import { Schedule } from "../entities/Schedule";
import { UpdateScheduleServiceInterface } from "../interfaces/UpdateScheduleServiceInterface";
import { ScheduleRepository } from "../ports/ScheduleRepository";

export class UpdateScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(updateSchedule: UpdateScheduleServiceInterface) {
    const { id, updateScheduleInterface: updateData } = updateSchedule;
    const schedule = await this.scheduleRepository.findById(updateSchedule.id);
    if (!schedule) {
      throw new Error("Not found schedule for update!");
    }
    const updateObj = {
      ...schedule,
      ...updateData
    };
    const scheduneForUpdate = new Schedule(
      updateObj.name,
      updateObj.hour,
      updateObj.id,
      updateObj.dayOfMonth,
      updateObj.dayOfWeek,
      updateObj.month
    );
    await this.scheduleRepository.update(updateSchedule.id, scheduneForUpdate);
  }
}