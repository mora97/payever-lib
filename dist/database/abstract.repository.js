"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
class AbstractRepository {
    constructor(model, connection) {
        this.model = model;
        this.connection = connection;
    }
    async create(document, options) {
        const createdDocument = new this.model({
            ...document,
            _id: new mongoose_1.Types.ObjectId()
        });
        return (await createdDocument.save(options)).toJSON();
    }
    async findOne(filterQuery) {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            this.logger.warn(`Document not found with filterQuery: ${filterQuery}`);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async findOneAndUpdate(filterQuery, update) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true
        });
        if (!document) {
            this.logger.warn(`Document not found with filterQuery: ${filterQuery}`);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async upsert(filterQuery, document) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true,
            upsert: true,
            new: true
        });
    }
    async find(filterQuery, page = 1, limit = 15) {
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
    async aggregate(filterQuery) {
        return this.model.aggregate(filterQuery);
    }
    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
    preparePagination(total, limit, page) {
        const totalPages = Math.ceil(total / limit);
        return {
            current_page: page,
            total_pages: totalPages,
            total_items: total,
            items_per_page: limit
        };
    }
}
exports.AbstractRepository = AbstractRepository;
//# sourceMappingURL=abstract.repository.js.map