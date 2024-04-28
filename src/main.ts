import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 9090, process.env.HOST || "0.0.0.0", () => {
    console.log(`Server up on PORT: ${process.env.PORT || 9090}, and host: ${process.env.HOST || "0.0.0.0"}`)
  });
}
bootstrap();
