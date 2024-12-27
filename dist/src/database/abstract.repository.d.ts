import { FilterQuery, Model, UpdateQuery, SaveOptions, Connection, PipelineStage } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';
export declare abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected readonly model: Model<TDocument>;
    private readonly connection;
    protected abstract readonly logger: CustomLoggerService;
    constructor(model: Model<TDocument>, connection: Connection);
    create(document: Omit<TDocument, '_id' | 'created_at'>, options?: SaveOptions): Promise<TDocument>;
    findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
    findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>[] : import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>>;
    upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>[] : import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>>;
    find(filterQuery: FilterQuery<TDocument>, page?: number, limit?: number): Promise<{
        items: import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>[];
        pagination: {
            current_page: number;
            total_pages: number;
            total_items: number;
            items_per_page: number;
        };
    }>;
    aggregate(filterQuery: PipelineStage[]): Promise<any[]>;
    startTransaction(): Promise<import("mongodb").ClientSession>;
    private preparePagination;
}
