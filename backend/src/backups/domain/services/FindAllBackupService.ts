import { BackupRepository } from "../ports/BackupRepository";

export class FindAllBackupService {
  constructor(private readonly backupRepository: BackupRepository) { }

  async execute() {
    return await this.backupRepository.findAll();
  }
}