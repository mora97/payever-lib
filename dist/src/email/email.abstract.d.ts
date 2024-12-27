import { EmailInterface } from './email.interface';
export declare class Email {
    private transporter;
    private configService;
    constructor();
    send(data: EmailInterface): Promise<any>;
    protected form(): string;
    private initMailTransporter;
}
