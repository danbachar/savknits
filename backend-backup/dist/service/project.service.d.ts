import { ProjectCreateDTO } from "src/dto/project.create.dto";
import { Project } from "src/entities/project.entity";
export declare class ProjectService {
    getAll(): Promise<Project[]>;
    get(id: string): Promise<Project>;
    create(dto: ProjectCreateDTO): Promise<Project>;
}
