"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Rejects requests with unexpected/invalid fields automatically,
    // using the DTO classes' class-validator decorators.
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    // Allows the browser-based frontend (running on a different port/file)
    // to call this API. Tighten this to your real frontend's URL before
    // going to production.
    app.enableCors({ origin: true });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`API running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map