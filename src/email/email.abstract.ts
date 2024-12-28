import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailInterface } from './email.interface';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';

export class Email {
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
    private configService: ConfigService = new ConfigService();
    private logger: CustomLoggerService = new CustomLoggerService()

    constructor() {
        this.initMailTransporter();
    }

    async send(data: EmailInterface) {
        const sendData = {
            ...data,
            from: this.form()
        };

        return this.transporter.sendMail(sendData);
    }

    protected form() {
        return this.configService.get<string>('EMAIL_ADDRESS');
    }

    private initMailTransporter() {
        try {
            this.transporter = nodemailer.createTransport({
                host: this.configService.get<string>('EMAIL_HOST_URI'),
                port: Number(this.configService.get<string>('EMAIL_PORT')),
                auth: {
                    user: this.configService.get<string>('EMAIL_HOST_USERNAME'),
                    pass: this.configService.get<string>('EMAIL_HOST_PASSWORD')
                }
            });
        } catch (error) {
            this.logger.error(`Mail Service didn not init...: ${error}`)
        }
        
    }
}
