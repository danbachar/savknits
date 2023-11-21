import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectService } from 'service/project.service';
import { ProjectController } from './project.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MulterModule.register({
      dest: './projects'
    })
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class AppModule {}
