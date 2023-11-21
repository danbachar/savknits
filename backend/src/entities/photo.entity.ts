import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public filename: string;

    @Column()
    public featured: boolean;

    @ManyToOne(() => Project, project => project.patterns)
    public project: Project;
}