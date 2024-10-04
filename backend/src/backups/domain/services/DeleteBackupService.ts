import { BackupRepository } from "../ports/BackupRepository";

export class DeleteBackupService {
  constructor(private readonly backupRepository: BackupRepository) { }

  async execute(id: number) {
    const backup = await this.backupRepository.findById(id);
    if (!backup) {
      throw new Error('Backup not found!');
    }
    await this.backupRepository.delete(id);
  }
}