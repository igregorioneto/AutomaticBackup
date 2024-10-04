import { StatusBackupsEnum } from "../entities/enum/StatusBackupsEnum";

export interface CreateBackupServiceInterface {
  name: string,
  type: string,
  status: StatusBackupsEnum,
  config: Record<string, any> | null,
}