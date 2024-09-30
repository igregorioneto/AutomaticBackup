import { Schedule } from "../entities/Schedule";

export interface ScheduleRepository {
  findById(id: number): Promise<Schedule | null>;
  findAll(): Promise<Schedule[] | null>;
  create(schedule: Schedule): Promise<void>;
  update(id: number, schedule: Schedule): Promise<void>;
  delete(id: number): Promise<void>;
}