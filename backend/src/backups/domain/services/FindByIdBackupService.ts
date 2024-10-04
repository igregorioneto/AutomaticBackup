import { BackupRepository } from "../ports/BackupRepository";

export class FindByIdBackupService {
  constructor(private readonly backupRepository: BackupRepository) { }

  async execute(id: number) {
    return await this.backupRepository.findById(id);
  }
}