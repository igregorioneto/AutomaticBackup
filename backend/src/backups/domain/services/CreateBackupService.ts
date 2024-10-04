import { Backup } from "../entities/Backup";
import { CreateBackupServiceInterface } from "../interfaces/CreateBackupServiceInterface";
import { BackupRepository } from "../ports/BackupRepository";

export class CreateBackupService {
  constructor(private readonly backupRepository: BackupRepository) { }

  async execute({
    name,
    type,
    status,
    config
  }: CreateBackupServiceInterface) {
    const backup = new Backup(
      name,
      type,
      status,
      config
    );
    await this.backupRepository.create(backup);
  }
}