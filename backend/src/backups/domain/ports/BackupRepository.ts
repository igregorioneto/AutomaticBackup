import { Backup } from "../entities/Backup";

export interface BackupRepository {
  findAll(): Promise<Backup[]>;
  findById(id: number): Promise<Backup | null>;
  create(backup: Backup): Promise<void>;
  delete(id: number): Promise<void>;
}