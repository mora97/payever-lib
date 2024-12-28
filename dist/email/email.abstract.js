"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
const custom_logger_service_1 = require("../custom-logger/custom-logger.service");
class Email {
    constructor() {
        this.configService = new config_1.ConfigService();
        this.logger = new custom_logger_service_1.CustomLoggerService();
        this.initMailTransporter();
    }
    async send(data) {
        const sendData = {
            ...data,
            from: this.form()
        };
        return this.transporter.sendMail(sendData);
    }
    form() {
        return this.configService.get('EMAIL_ADDRESS');
    }
    initMailTransporter() {
        try {
            this.transporter = nodemailer.createTransport({
                host: this.configService.get('EMAIL_HOST_URI'),
                port: Number(this.configService.get('EMAIL_PORT')),
                auth: {
                    user: this.configService.get('EMAIL_HOST_USERNAME'),
                    pass: this.configService.get('EMAIL_HOST_PASSWORD')
                }
            });
        }
        catch (error) {
            this.logger.error(`Mail Service didn not init...: ${error}`);
        }
    }
}
exports.Email = Email;
//# sourceMappingURL=email.abstract.js.map