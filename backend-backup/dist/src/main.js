"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const ormconfig_1 = require("../ormconfig");
async function bootstrap() {
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await ormconfig_1.default.initialize();
    console.log('Initialized DB connection');
    await app.listen(port);
    console.log(`App is started and listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map