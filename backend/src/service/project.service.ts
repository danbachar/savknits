import { Injectable } from "@nestjs/common";
import { ProjectCreateDTO } from "src/dto/project.create.dto";
import { Pattern } from "src/entities/pattern.entity";
import { Photo } from "src/entities/photo.entity";
import { Project } from "src/entities/project.entity";

@Injectable()
export class ProjectService {
    getAll(): Promise<Project[]> {
        return Project.find({ relations: ["photos"]});
    }

    get(id: string): Promise<Project> {
        return Project.findOne({ where: { id }, relations: ["photos", "patterns"]});
    }

    async create(dto: ProjectCreateDTO): Promise<Project> {
        const project = new Project();
        project.description = dto.description;
        project.name = dto.name;
        
        const pattern = new Pattern();
        pattern.featured = true;
        pattern.filename = `/${dto.mainPattern}`;
        pattern.name = "Main";
        project.patterns = [pattern];

        const photo = new Photo();
        photo.featured = true;
        photo.filename = `/${dto.mainPhoto}`;
        photo.name = "Main";
        project.photos = [photo];

        const newProject = await project.save();
        newProject.photos = [photo];
        newProject.patterns = [pattern];

        return newProject;
    }
}