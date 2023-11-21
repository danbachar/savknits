import { NestFactory } from '@nestjs/core';
import connectDB from '../config/ormconfig';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  await connectDB.initialize();
  console.log('Initialized DB connection');

  await app.listen(port);
  console.log(`App is started and listening on port ${port}`);
}
bootstrap();
