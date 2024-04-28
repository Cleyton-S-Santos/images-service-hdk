import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';

config
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Images API')
  .setDescription('The Images API description')
  .setVersion('1.0')
  .addTag('images')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 9090, process.env.HOST || "0.0.0.0", () => {
    console.log(`Server up on PORT: ${process.env.PORT || 9090}, and host: ${process.env.HOST || "0.0.0.0"}`)
  });
}
bootstrap();
