import { PrismaClient } from "@prisma/client";
import { Schedule } from "../../domain/entities/Schedule";
import { ScheduleRepository } from "../../domain/ports/ScheduleRepository";

const prisma = new PrismaClient();

export class PrismaScheduleRepository implements ScheduleRepository {
  async findById(id: number): Promise<Schedule | null> {
    const scheduleData = await prisma.schedules.findUnique({ where: { id } });
    if (!scheduleData) return null;
    return new Schedule(
      scheduleData.name,
      scheduleData.hour,
      scheduleData.id ?? null,
      scheduleData.month ?? null,
      scheduleData.dayOfMonth ?? null,
      scheduleData.dayOfWeek ?? null,
    );
  }

  async create(schedule: Schedule): Promise<void> {
    await prisma.schedules.create({
      data: schedule
    })
  }

  async findAll(): Promise<Schedule[]> {
    return await prisma.schedules.findMany();
  }

  async delete(id: number): Promise<void> {
    await prisma.schedules.delete({ where: { id } });
  }

  async update(id: number, schedule: Schedule): Promise<void> {
    await prisma.schedules.update({
      where: { id },
      data: schedule
    });
  }
}