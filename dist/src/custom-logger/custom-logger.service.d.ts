export declare class CustomLoggerService {
    private readonly logger;
    private readonly configService;
    private readonly loggerConcfig;
    constructor();
    log(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
}
