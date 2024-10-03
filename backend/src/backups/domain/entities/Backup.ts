import { StatusBackupsEnum } from "./enum/StatusBackupsEnum";

export class Backup {
  constructor(
    public name: string,
    public type: string,
    public status: StatusBackupsEnum,
    public config: Record<string, any> | null = {},
    public id?: number
  ) {}
}