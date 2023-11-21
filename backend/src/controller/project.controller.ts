import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProjectCreateDTO } from 'src/dto/project.create.dto';
import { Project } from 'src/entities/project.entity';
import { ProjectService } from 'src/service/project.service';
import { mkdirp } from 'mkdirp';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/api/project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    getAll(): Promise<Project[]> {
        return this.projectService.getAll();
    }

    @Get(':id')
    get(@Param('id') id: string): Promise<Project> {
        return this.projectService.get(id);
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'mainPattern', maxCount: 1 },
        { name: 'mainPhoto', maxCount: 1 },
    ]))
    async save(@Body() dto: ProjectCreateDTO, 
               @UploadedFiles() files: { mainPattern: Express.Multer.File[], 
                                         mainPhoto?: Express.Multer.File[] }): Promise<Project> {
        const mainPattern = files.mainPattern[0];
        
        const newPatternDirectoryPath = path.join(mainPattern.destination, 'projects', 'patterns', dto.name);
        await mkdirp(newPatternDirectoryPath);
        files.mainPattern.forEach(async (file) => {
            const oldFilePath = path.join(file.destination, file.fieldname);
            const newFilePath = path.join(newPatternDirectoryPath, file.originalname);
            await fs.rename(oldFilePath, newFilePath, console.error);
            dto.mainPattern = newFilePath;
        });

        const newPhotosDirectoryPath = path.join(mainPattern.destination, 'projects', 'photos', dto.name);
        await mkdirp(newPhotosDirectoryPath);
        files.mainPhoto.forEach(async (file) => {
            const oldFilePath = path.join(file.destination, file.filename);
            const newFilePath = path.join(newPhotosDirectoryPath, file.originalname);
            await fs.rename(oldFilePath, newFilePath, console.error);
            dto.mainPhoto = newFilePath;
        });
        return this.projectService.create(dto);
    }

}
