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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLoggerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const winston_1 = require("winston");
const custom_logger_config_1 = require("./custom-logger.config");
let CustomLoggerService = class CustomLoggerService {
    constructor() {
        this.configService = new config_1.ConfigService();
        this.loggerConcfig = new custom_logger_config_1.CustomLoggerConfig();
        this.logger = (0, winston_1.createLogger)({
            format: this.loggerConcfig.getFormat(),
            transports: this.loggerConcfig.getTransporter(),
        });
        if (this.configService.get('NODE_ENV') !== 'production') {
            this.logger.add(new winston_1.transports.Console());
        }
    }
    log(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    info(message) {
        this.logger.info(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
};
exports.CustomLoggerService = CustomLoggerService;
exports.CustomLoggerService = CustomLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CustomLoggerService);
//# sourceMappingURL=custom-logger.service.js.map