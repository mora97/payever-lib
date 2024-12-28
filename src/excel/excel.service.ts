import { Injectable } from '@nestjs/common';
import * as ExcelJs from 'exceljs';

@Injectable()
export class ExcelService {
    private workbook;
    private worksheet;

    constructor(private readonly fileName: string) {
        this.workbook = new ExcelJs.Workbook();
        this.worksheet = this.workbook.addWorksheet(fileName);

        this.prepareExcel();
    }

    columns() {
        return [];
    }

    rows() {
        return [];
    }

    private prepareExcel() {
        this.worksheet.columns = this.columns();

        this.rows().forEach((row) => {
            this.workbook.addRow(row);
        });
    }
}
