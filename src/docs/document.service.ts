import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class DocumentService {
    constructor(
        private readonly app: INestApplication,
        private readonly options: {
            title: string;
            description: string;
            version: string;
            tag: string;
        }
    ) {
        const config = new DocumentBuilder()
            .setTitle(options.title)
            .setDescription(options.description)
            .setVersion(options.version)
            .addTag(options.tag)
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('api', app, document);
    }
}
