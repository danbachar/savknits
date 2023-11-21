
import { Pattern } from "src/entities/pattern.entity";
import { Photo } from "src/entities/photo.entity";
import { Project } from "src/entities/project.entity";
import { DataSource } from "typeorm";

let connectDB = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'knitting',
    password: 'knitting',
    database: 'knitting',
    entities: [Project, Photo, Pattern],
    logging: false,
    synchronize: true,
});

export default connectDB;