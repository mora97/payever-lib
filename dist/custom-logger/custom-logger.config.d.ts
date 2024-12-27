import 'winston-daily-rotate-file';
export declare class CustomLoggerConfig {
    private readonly configService;
    getFormat(): import("logform").Format;
    getTransporter(): import("winston-daily-rotate-file")[];
}
