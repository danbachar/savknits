import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MulterModule.register({
      dest: './dist/client/projects'
    })
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class AppModule {}
