import { Injectable } from "@nestjs/common";
import { ProjectCreateDTO } from "src/dto/project.create.dto";
import { Project } from "src/entities/project.entity";

@Injectable()
export class ProjectService {
    async getAll(): Promise<Project[]> {
        return Project.find();
    }

    async get(id: string): Promise<Project> {
        return Project.findOne({ where: { id }, relations: ["photos", "patterns"]});
    }

    create(dto: ProjectCreateDTO): Promise<Project> {
        const project = new Project();
        project.mainPattern = dto.mainPattern;
        project.mainPhoto = dto.mainPhoto;
        project.description = dto.description;
        project.name = dto.name;

        console.log(project);
        return project.save();
    }
}