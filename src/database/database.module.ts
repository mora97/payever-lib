import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {
    static register({ dbUri }): DynamicModule{
        return {
            module: DatabaseModule,
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: () => ({
                        uri: dbUri
                    }),
                    inject: [ConfigService]
                })
            ],
            exports: [MongooseModule]
        }
    }
}
