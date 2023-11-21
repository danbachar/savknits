"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_entity_1 = require("./src/entities/pattern.entity");
const photo_entity_1 = require("./src/entities/photo.entity");
const project_entity_1 = require("./src/entities/project.entity");
const typeorm_1 = require("typeorm");
let connectDB = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'knitting',
    password: 'knitting',
    database: 'knitting',
    entities: [project_entity_1.Project, photo_entity_1.Photo, pattern_entity_1.Pattern],
    logging: false,
    synchronize: true,
});
exports.default = connectDB;
//# sourceMappingURL=ormconfig.js.map