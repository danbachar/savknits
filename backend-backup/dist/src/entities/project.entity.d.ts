import { BaseEntity } from "typeorm";
import { Photo } from "./photo.entity";
import { Pattern } from "./pattern.entity";
export declare class Project extends BaseEntity {
    id: string;
    name: string;
    description: string;
    photos: Photo[];
    patterns: Pattern[];
    mainPhoto: string;
    mainPattern: string;
}
