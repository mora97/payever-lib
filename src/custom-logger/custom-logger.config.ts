import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { format, transports } from "winston";
import 'winston-daily-rotate-file';

export class CustomLoggerConfig {
    private readonly configService = new ConfigService()

    getFormat() {
        return format.combine(
            format.timestamp(),
            format.printf(({ timestamp, level, message }) => {
                return ` ${this.configService.get<string>('APP_NAME')} => ${timestamp} [${level}]: ${message}`;
            })
        )
    }

    getTransporter() {
        const logDir = join(process.cwd(), 'storage/logs')

        return [
            new transports.DailyRotateFile({
                filename: 'rotate-%DATE%.log',
                dirname: logDir,
                zippedArchive: true,
                datePattern: 'YYYY-MM-DD',
                maxFiles: '20d',
                maxSize: '30m',
            }),
        ]
    }
}