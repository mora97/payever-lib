"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractExcel = void 0;
const config_1 = require("@nestjs/config");
const exceljs_1 = require("exceljs");
const path_1 = require("path");
const fs_1 = require("fs");
const custom_logger_service_1 = require("../custom-logger/custom-logger.service");
class AbstractExcel {
    constructor() {
        this.configeService = new config_1.ConfigService();
        this.logger = new custom_logger_service_1.CustomLoggerService();
        this.workbook = new exceljs_1.Workbook();
    }
    columns() {
        return [];
    }
    rows() {
        return [];
    }
    fileName() {
        return 'file';
    }
    async make() {
        const name = this.fileName();
        this.worksheet = this.workbook.addWorksheet(name);
        this.worksheet.columns = this.columns();
        this.rows().forEach((row) => {
            this.worksheet.addRow(row);
        });
        const basePath = await this.excelsPathDirectory();
        this.filePath = `${basePath}/${name}.xlsx`;
        await this.workbook.xlsx.writeFile(this.filePath);
        return this;
    }
    get getFilePath() {
        return this.filePath;
    }
    async excelsPathDirectory() {
        const path = (0, path_1.join)(process.cwd(), `${this.configeService.get('SALES_REPORT_STORAGE_PATH')}`);
        try {
            await fs_1.promises.access(path);
        }
        catch {
            await fs_1.promises.mkdir(path, { recursive: true });
            this.logger.info(`[Excel Abstract Servcie] Directory created: ${path}`);
        }
        return path;
    }
}
exports.AbstractExcel = AbstractExcel;
//# sourceMappingURL=abstract.excel.js.map