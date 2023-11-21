import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pattern } from "./pattern.entity";
import { Photo } from "./photo.entity";

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @OneToMany(() => Photo, photo => photo.project, { cascade: true })
    public photos: Photo[];

    @OneToMany(() => Pattern, pattern => pattern.project, { cascade: true })
    public patterns: Pattern[];
}