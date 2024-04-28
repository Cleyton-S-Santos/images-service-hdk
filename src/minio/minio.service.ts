import { Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';
import { Client } from 'minio';
import { envs } from 'src/config/envsFactory';

@Injectable()
export class MinioService {
    private minioClient: Client
    private bucketName: string
    private log: Logger;

    constructor() {
        this.log = new Logger(MinioService.name);
        this.minioClient = new Client({
          endPoint: envs.minioEndPoint,
          port: Number(envs.minioPort),
          useSSL: true,
          accessKey: envs.minioAccessKey,
          secretKey: envs.minioSecretKey
        })
        this.bucketName = envs.minioBucketName
      }

      async uploadFile(file: Express.Multer.File) {
        this.log.debug(`Uploading file - ${file.originalname}`)
        const fileName = `${v4()}-${Date.now()}-${file.originalname}`
        this.log.debug(`new file name: ${fileName.replaceAll(' ','')}`)
        try{
            await this.minioClient.putObject(
                this.bucketName,
                fileName.replaceAll(' ',''),
                file.buffer,
                file.size
              )
        } catch(err){
            this.log.error(err)
        }
        this.log.debug(`file saved, returning url`)
        return envs.publicMinioHost+this.bucketName+"/"+fileName

      } 

      async deleteFile(fileName: string) {
        await this.minioClient.removeObject(this.bucketName, fileName)
      }
}
