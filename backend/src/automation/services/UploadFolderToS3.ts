import fs from "fs";
import path from "path";
import { promisify } from "util";
import { UploadFolderToS3Interface } from "../interfaces/UploadFolderToS3Interface";
import { UploadFileToS3 } from "./UploadFileToS3";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export class UploadFolderToS3 {
  constructor(
    private readonly uploadFileToS3: UploadFileToS3
  ) { }

  async execute({ bucketName, folderPath }: UploadFolderToS3Interface) {
    try {
      const files = await readdir(folderPath);
      for (const fileName of files) {
        const fullPath = path.join(folderPath, fileName);
        const fileStat = stat(fullPath);

        if ((await fileStat).isFile()) {
          const s3Key = path.relative(process.cwd(), fullPath);
          await this.uploadFileToS3.execute({
            bucketName: bucketName,
            filePath: fullPath,
            key: s3Key
          });
        } else if ((await fileStat).isDirectory()) {
          await this.execute({ bucketName, folderPath: fullPath });
        }
      }
    } catch (error) {
      console.error(`Error to upload folders: `, error);
    }
  }
}