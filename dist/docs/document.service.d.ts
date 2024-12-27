import { INestApplication } from "@nestjs/common";
export declare class DocumentService {
    private readonly app;
    private readonly options;
    constructor(app: INestApplication, options: {
        title: string;
        description: string;
        version: string;
        tag: string;
    });
}
