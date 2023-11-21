/// <reference types="multer" />
import { ProjectService } from 'service/project.service';
import { ProjectCreateDTO } from './dto/project.create.dto';
import { Project } from './entities/project.entity';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    getAll(): Promise<Project[]>;
    get(id: string): Promise<Project>;
    save(proj: ProjectCreateDTO, files: {
        mainPattern: Express.Multer.File[];
        auxPattern?: Express.Multer.File[];
        mainPhoto?: Express.Multer.File[];
        auxPhoto?: Express.Multer.File[];
    }): Promise<Project>;
}
