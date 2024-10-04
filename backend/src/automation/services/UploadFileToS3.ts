import fs from "fs";
import AWS from "aws-sdk";
import { UploadFileToS3Interface } from "../interfaces/UploadFileToS3Interface";

export class UploadFileToS3 {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this.s3 = new AWS.S3();
  }

  async execute({ bucketName, filePath, key }: UploadFileToS3Interface) {
    const fileContent = fs.readFileSync(filePath);
    const params = { Bucket: bucketName, Key: key, Body: fileContent };
    try {
      await this.s3.upload(params).promise();
      console.log(`File upload successfully ${key}`);
    } catch (error) {
      console.error(`Error file upload ${key}`, error);
    }
  }
}