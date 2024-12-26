import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createLogger, Logger, transports } from "winston";
import { CustomLoggerConfig } from "./custom-logger.config";

@Injectable()
export class CustomLoggerService {
    private readonly logger: Logger
    private readonly configService = new ConfigService()
    private readonly loggerConcfig = new CustomLoggerConfig()

    constructor() {
        this.logger = createLogger(
            {
                format: this.loggerConcfig.getFormat(),
                transports: this.loggerConcfig.getTransporter(),
            }
        )

        if(this.configService.get<string>('NODE_ENV') !== 'production'){
            this.logger.add(new transports.Console())
        }
    }

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    info(message: string) {
        this.logger.info(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }
}