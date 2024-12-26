import { Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Module({
    providers: [CustomLoggerService],
    exports: [CustomLoggerService], // Export if needed in other modules
})
export class CustomLoggerModule {}