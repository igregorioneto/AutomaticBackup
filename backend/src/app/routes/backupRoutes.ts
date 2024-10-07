import { Router } from "express";
import { PrismaBackupRepository } from "../../backups/infra/repositories/PrismaBackupRepository";
import { FindByIdBackupService } from "../../backups/domain/services/FindByIdBackupService";
import { FindAllBackupService } from "../../backups/domain/services/FindAllBackupService";
import { DeleteBackupService } from "../../backups/domain/services/DeleteBackupService";
import { BackupController } from "../controllers/BackupController";

const router = Router();

const prismaBackupRepository = new PrismaBackupRepository();
const findByIdBackupService = new FindByIdBackupService(
  prismaBackupRepository
);
const findAllBackupService = new FindAllBackupService(
  prismaBackupRepository
);
const deleteBackupService = new DeleteBackupService(
  prismaBackupRepository
);

const backupController = new BackupController(
  findByIdBackupService,
  findAllBackupService,
  deleteBackupService
);

/**
 * @swagger
 * /backups:
 *  get:
 *    summary: Return Find All Backup
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
*                  name:
*                    type: string
*                    example: Backup 1
*                  type:
*                    type: string
*                    example: aws
*                  status:
*                    type: string
*                    example: INITIALIZED
*                  config:
*                    type: object
*                    example: {}
*                  id:
*                     type: number
*                     example: 1
 */
router.get('/', async (req, res, next) => {
  try {
    await backupController.findAll(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await backupController.findById(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await backupController.delete(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;