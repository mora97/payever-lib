"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
class Email {
    constructor() {
        this.configService = new config_1.ConfigService();
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
        console.log(this.configService.get('EMAIL_HOST_URI'));
        console.log('eeeeww');
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST_URI'),
            port: Number(this.configService.get('EMAIL_PORT')),
            auth: {
                user: this.configService.get('EMAIL_HOST_USERNAME'),
                pass: this.configService.get('EMAIL_HOST_PASSWORD')
            }
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=email.abstract.js.map