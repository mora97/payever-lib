import { DynamicModule } from '@nestjs/common';
export declare class DatabaseModule {
    static register({ dbUri }: {
        dbUri: any;
    }): DynamicModule;
}
