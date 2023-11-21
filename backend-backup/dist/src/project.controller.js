"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("../service/project.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const path = require("path");
const mkdirp_1 = require("mkdirp");
const project_create_dto_1 = require("./dto/project.create.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    getAll() {
        return this.projectService.getAll();
    }
    get(id) {
        return this.projectService.get(id);
    }
    async save(proj, files) {
        const mainPattern = files.mainPattern[0];
        const newPatternDirectoryPath = path.join(mainPattern.destination, 'projects', 'patterns', proj.name);
        const newPhotosDirectoryPath = path.join(mainPattern.destination, 'projects', 'photos', proj.name);
        await (0, mkdirp_1.mkdirp)(newPatternDirectoryPath);
        await (0, mkdirp_1.mkdirp)(newPhotosDirectoryPath);
        files.auxPattern.concat(files.mainPattern).forEach(async (file) => {
            const oldFilePath = path.join(file.destination, file.filename);
            const newFilePath = path.join(newPatternDirectoryPath, file.filename);
            await fs.rename(oldFilePath, newFilePath, console.error);
        });
        files.auxPhoto.concat(files.mainPhoto).forEach(async (file) => {
            const oldFilePath = path.join(file.destination, file.filename);
            const newFilePath = path.join(newPhotosDirectoryPath, file.filename);
            await fs.rename(oldFilePath, newFilePath, console.error);
        });
        proj.mainPattern = files.mainPattern[0].filename;
        return this.projectService.create(proj);
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)(':id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'mainPattern', maxCount: 1 },
        { name: 'auxPattern' },
        { name: 'mainPhoto', maxCount: 1 },
        { name: 'auxPhoto' }
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_create_dto_1.ProjectCreateDTO, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "save", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('/api/project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map