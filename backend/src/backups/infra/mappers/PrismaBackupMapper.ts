import { 
  Prisma,
  Backups as PrismaBackups,
  StatusBackupsEnum as PrismaStatusBackupsEnum
} from "@prisma/client";
import { Backup } from "../../domain/entities/Backup";
import { StatusBackupsEnum } from "../../domain/entities/enum/StatusBackupsEnum";
import { JsonValue } from "@prisma/client/runtime/library";

function mapStatus(status: PrismaStatusBackupsEnum): StatusBackupsEnum {
  switch(status) {
    case "INITIALIZED":
      return StatusBackupsEnum.INITIALIZED;
    case "EXECUTING":
      return StatusBackupsEnum.EXECUTING;
    case "FINISHED":
      return StatusBackupsEnum.FINISHED;
    case "FAILED":
      return StatusBackupsEnum.FAILED;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}

export function mapPrismaBackupMapper(prismaBackups: PrismaBackups): Backup {
  return new Backup(
    prismaBackups.name,
    prismaBackups.type,
    mapStatus(prismaBackups.status),
    prismaBackups.config as Record<string, any> ?? {},
    prismaBackups.id ?? null
  );
}

export function mapBackupsPrismaMapper(backups: Backup): Omit<PrismaBackups, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    name: backups.name,
    type: backups.type,
    status: mapStatus(backups.status),
    config: backups.config ? (backups.config as JsonValue) : {} as JsonValue,
  };
}