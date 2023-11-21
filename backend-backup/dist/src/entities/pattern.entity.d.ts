import { BaseEntity } from "typeorm";
import { Project } from "./project.entity";
export declare class Pattern extends BaseEntity {
    id: string;
    name: string;
    filename: string;
    project: Project;
}
