import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MinioService } from './minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller("/image")
@ApiTags('Image')
export class AppController {
  constructor(private readonly minioService: MinioService) {}

  @Post("/save")
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiResponse({ status: 200, description: 'image url' })
  saveImage(@UploadedFile() file: Express.Multer.File) {
    return this.minioService.uploadFile(file);
  }

  @Delete("/delete/:fileName")
  @ApiOperation({ summary: 'Delete an image file' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  deleteImage(@Param("fileName") filename: string){
    return this.minioService.deleteFile(filename);
  }
}
