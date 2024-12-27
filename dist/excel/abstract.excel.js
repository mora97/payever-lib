"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractExcel = void 0;
const config_1 = require("@nestjs/config");
const exceljs_1 = require("exceljs");
const path_1 = require("path");
class AbstractExcel {
    constructor() {
        this.configeService = new config_1.ConfigService();
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
        this.filePath = (0, path_1.join)(process.cwd(), `${this.configeService.get('SALES_REPORT_STORAGE_PATH')}/${name}.xlsx`);
        console.log(__dirname, this.filePath);
        await this.workbook.xlsx.writeFile(this.filePath);
        return this;
    }
    get getFilePath() {
        return this.filePath;
    }
}
exports.AbstractExcel = AbstractExcel;
//# sourceMappingURL=abstract.excel.js.map