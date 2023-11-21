import { BaseEntity } from "typeorm";
import { Project } from "./project.entity";
export declare class Photo extends BaseEntity {
    id: string;
    name: string;
    filename: string;
    project: Project;
}
