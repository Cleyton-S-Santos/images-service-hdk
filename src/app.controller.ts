import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MinioService } from './minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("/image")
export class AppController {
  constructor(private readonly minioService: MinioService) {}

  @Post("/save")
  @UseInterceptors(FileInterceptor('file'))
  saveImage(@UploadedFile() file: Express.Multer.File) {
    return this.minioService.uploadFile(file);
  }

  @Delete("/delete/:fileName")
  deleteImage(@Param("fileName") filename: string){
    return this.minioService.deleteFile(filename);
  }
}
