"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const swagger_1 = require("@nestjs/swagger");
class DocumentService {
    constructor(app, options) {
        this.app = app;
        this.options = options;
        const config = new swagger_1.DocumentBuilder()
            .setTitle(options.title)
            .setDescription(options.description)
            .setVersion(options.version)
            .addTag(options.tag)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
    }
}
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map