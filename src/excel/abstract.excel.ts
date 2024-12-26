import { ConfigService } from '@nestjs/config';
import { Workbook } from 'exceljs';
import { join } from 'path';

export abstract class AbstractExcel {
    private workbook;
    private worksheet;
    private filePath: string;
    private readonly configeService: ConfigService = new ConfigService()

    constructor() {
        this.workbook = new Workbook();
    }

    protected columns() {
        return [];
    }

    protected rows() {
        return [];
    }

    protected fileName() {
        return 'file';
    }

    async make() {
        const name = this.fileName()
        this.worksheet = this.workbook.addWorksheet(name);
        this.worksheet.columns = this.columns();

        this.rows().forEach((row) => {
            this.worksheet.addRow(row);
        });

        this.filePath = join(
            process.cwd(), 
            `${this.configeService.get<string>('SALES_REPORT_STORAGE_PATH')}/${name}.xlsx`
        )

        // this.filePath = join(__dirname, '..', '..', '..', 'storage', 'public', 'reports', `${name}.xlsx`);

        console.log(__dirname, this.filePath);
        await this.workbook.xlsx.writeFile(this.filePath);

        return this;
    }

    get getFilePath() {
        return this.filePath;
    }
}
