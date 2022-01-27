import { TransformInterceptor } from './transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // So I'm going to basically tell NestJS: "whenever you encounter a validation decorator,
  // I want you to run your validation So I don't have to explicitly define it in any controller
  // or in any parameter."

  //  before listening and basically making my server live, I'm going to
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listens to port ${port}`);
}
bootstrap();
