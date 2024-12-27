"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const common_1 = require("@nestjs/common");
const ExcelJs = require("exceljs");
let ExcelService = class ExcelService {
    constructor(fileName) {
        this.fileName = fileName;
        this.workbook = new ExcelJs.Workbook();
        this.worksheet = this.workbook.addWorksheet(fileName);
        this.prepareExcel();
    }
    columns() {
        return;
    }
    rows() {
        return [];
    }
    prepareExcel() {
        this.worksheet.columns = this.columns();
        this.rows().forEach((row) => {
            this.workbook.addRow(row);
        });
    }
};
exports.ExcelService = ExcelService;
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], ExcelService);
//# sourceMappingURL=excel.service.js.map