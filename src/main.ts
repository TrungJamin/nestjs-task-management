import { TransformInterceptor } from './transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // So I'm going to basically tell NestJS: "whenever you encounter a validation decorator,
  // I want you to run your validation So I don't have to explicitly define it in any controller
  // or in any parameter."

  //  before listening and basically making my server live, I'm going to
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
