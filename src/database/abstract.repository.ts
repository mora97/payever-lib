import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery, SaveOptions, Connection, PipelineStage } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: CustomLoggerService;

    constructor(
        protected readonly model: Model<TDocument>,
        private readonly connection: Connection
    ) {}

    async create(document: Omit<TDocument, '_id' | 'created_at'>, options?: SaveOptions): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        });

        return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });

        if (!document) {
            this.logger.warn(`Document not found with filterQuery: ${filterQuery}`);
            throw new NotFoundException('Document not found.');
        }

        return document as TDocument;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true
        });

        if (!document) {
            this.logger.warn(`Document not found with filterQuery: ${filterQuery}`);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true,
            upsert: true,
            new: true
        });
    }

    async find(filterQuery: FilterQuery<TDocument>, page: number = 1, limit: number = 15) {
        console.log(page);

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            this.model.find(filterQuery, {}, { lean: true }).skip(skip).limit(limit),
            this.model.countDocuments()
        ]);

        return {
            items,
            pagination: this.preparePagination(total, limit, page)
        };
    }

    async aggregate(filterQuery: PipelineStage[]) {
        return this.model.aggregate(filterQuery);
    }

    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }

    private preparePagination(total: number, limit: number, page: number) {
        const totalPages = Math.ceil(total / limit);

        return {
            current_page: page,
            total_pages: totalPages,
            total_items: total,
            items_per_page: limit
        };
    }
}
