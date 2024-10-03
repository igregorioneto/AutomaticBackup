import { PrismaClient } from "@prisma/client";
import { BackupRepository } from "../../domain/ports/BackupRepository";
import { Backup } from "../../domain/entities/Backup";
import { mapBackupsPrismaMapper, mapPrismaBackupMapper } from "../mappers/PrismaBackupMapper";

const prisma = new PrismaClient();

export class PrismaBackupRepository implements BackupRepository {
  async findAll(): Promise<Backup[]> {
    const backupsPrisma = await prisma.backups.findMany();
    const backups = backupsPrisma.map(backup => mapPrismaBackupMapper(backup));
    return backups;
  }

  async findById(id: number): Promise<Backup | null> {
    const backupPrisma = await prisma.backups.findUnique({ where: { id } });
    if (!backupPrisma) {
      throw new Error('Backup is not found!');
    }
    return mapPrismaBackupMapper(backupPrisma);
  }

  async create(backup: Backup): Promise<void> {
    const { config, ...backupsData } = mapBackupsPrismaMapper(backup);
    await prisma.backups.create({
      data: {
        ...backupsData,
        config: JSON.stringify(config)
      }
    });
  }

  async delete(id: number): Promise<void> {
    const backupsPrisma = await prisma.backups.findUnique({ where: { id } });
    if (!backupsPrisma) {
      throw new Error('Backup not found!');
    }
    await prisma.backups.delete({ where: { id } });
  }
}