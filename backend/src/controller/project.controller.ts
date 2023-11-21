import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { mkdirp } from 'mkdirp';
import * as path from 'path';
import { ProjectAddStepDTO } from 'src/dto/project.add-step.dto';
import { ProjectCreateDTO } from 'src/dto/project.create.dto';
import { Project } from 'src/entities/project.entity';
import { ProjectService } from 'src/service/project.service';

@Controller('/api/project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    private async moveFileAndReturnNewPath(file: Express.Multer.File, projectName: string, where: string): Promise<string> {
        const newDirectoryPath = path.join(file.destination, projectName, where).replace(" ", "_");
        await mkdirp(newDirectoryPath);

        const clientFilePath = path.join('projects', projectName, where, file.originalname).replace(" ", "_"); // TODO: make better because of duplication with destination
        const newFilePath = path.join(newDirectoryPath, file.originalname);
        await fs.rename(file.path, newFilePath, (err) => { if (!!err) { console.error(err) } });
        return clientFilePath;
    }

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
        dto.mainPattern = await this.moveFileAndReturnNewPath(mainPattern, dto.name, 'patterns');
    
        const mainPhoto = files.mainPhoto[0];
        dto.mainPhoto = await this.moveFileAndReturnNewPath(mainPhoto, dto.name, 'photos');
        
        return this.projectService.create(dto);
    }

    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'photo', maxCount: 1 },
    ]))
    async addStep(@Param("id") id: string,
                  @Body() dto: ProjectAddStepDTO, 
                  @UploadedFiles() files: { photo: Express.Multer.File[] }): Promise<Project> {
        const project = await this.projectService.get(id);
        const newFilepath = await this.moveFileAndReturnNewPath(files.photo[0], project.name, "photos");
        dto.filename = newFilepath;
        return this.projectService.addStep(id, dto);
    }
}
