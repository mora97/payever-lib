"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path_1 = require("path");
const custom_logger_service_1 = require("./custom-logger/custom-logger.service");
const logger = new custom_logger_service_1.CustomLoggerService();
const downloadFile = (response, filePath, fileName = 'file.xlsx') => {
    const path = (0, path_1.join)(process.cwd(), filePath);
    const fileStream = fs.createReadStream(path);
    fileStream.on('end', () => {
        try {
            fs.unlinkSync(path);
        }
        catch (error) {
            logger.error('An error occurred while removing the file.');
            throw new common_1.BadRequestException('An error occurred while removing the file.');
        }
    });
    response.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${fileName}`
    });
    response.sendFile(path);
};
exports.downloadFile = downloadFile;
//# sourceMappingURL=utiles.js.map