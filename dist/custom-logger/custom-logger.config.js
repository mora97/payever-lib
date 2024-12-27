"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLoggerConfig = void 0;
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const winston_1 = require("winston");
require("winston-daily-rotate-file");
class CustomLoggerConfig {
    constructor() {
        this.configService = new config_1.ConfigService();
    }
    getFormat() {
        return winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message }) => {
            return ` ${this.configService.get('APP_NAME')} => ${timestamp} [${level}]: ${message}`;
        }));
    }
    getTransporter() {
        const logDir = (0, path_1.join)(process.cwd(), 'storage/logs');
        return [
            new winston_1.transports.DailyRotateFile({
                filename: 'rotate-%DATE%.log',
                dirname: logDir,
                zippedArchive: true,
                datePattern: 'YYYY-MM-DD',
                maxFiles: '20d',
                maxSize: '30m',
            }),
        ];
    }
}
exports.CustomLoggerConfig = CustomLoggerConfig;
//# sourceMappingURL=custom-logger.config.js.map