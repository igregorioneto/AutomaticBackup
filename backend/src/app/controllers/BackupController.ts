import { Request, Response } from "express";
import { DeleteBackupService } from "../../backups/domain/services/DeleteBackupService";
import { FindAllBackupService } from "../../backups/domain/services/FindAllBackupService";
import { FindByIdBackupService } from "../../backups/domain/services/FindByIdBackupService";

export class BackupController {
  constructor(
    private readonly findByIdBackupService: FindByIdBackupService,
    private readonly findAllBackupService: FindAllBackupService,
    private readonly deleteBackupService: DeleteBackupService
  ) {}

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.findAllBackupService.execute();
      return res.status(200).send({
        message: 'Find All Backups',
        data: result,
        success: true
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({
          message: error.message,
          success: false
        });
      }
      return res.status(401).send({
        message: 'Unknown error',
        success: false
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).send({
          message: 'ID params is required',
          success: false
        });
      }
      const result = await this.findByIdBackupService.execute(+id);
      return res.status(200).send({
        message: 'Backups is found',
        data: result,
        success: true
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({
          message: error.message,
          success: false
        });
      }
      return res.status(401).send({
        message: 'Unknown error',
        success: false
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).send({
          message: 'ID params is required',
          success: false
        });
      }
      await this.deleteBackupService.execute(+id);
      return res.status(204).send({
        message: 'Backup deleted successfully',
        success: true
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).send({
          message: error.message,
          success: false
        });
      }
      return res.status(401).send({
        message: 'Unknown error',
        success: false
      });
    }
  }
}