import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri:
                    configService.get<string>('NODE_ENV') === 'test'
                        ? configService.get<string>('MONGODB_TEST_URI')
                        : configService.get<string>('MONGODB_URI'),
                dbName: configService.get<string>('MONGODB_NAME')
            }),
            inject: [ConfigService]
        })
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {}
