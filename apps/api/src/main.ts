import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Rejects requests with unexpected/invalid fields automatically,
  // using the DTO classes' class-validator decorators.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Allows the browser-based frontend (running on a different port/file)
  // to call this API. Tighten this to your real frontend's URL before
  // going to production.
  app.enableCors({ origin: true });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}
bootstrap();
