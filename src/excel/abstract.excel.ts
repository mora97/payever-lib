import { ConfigService } from '@nestjs/config';
import { Workbook } from 'exceljs';
import { join } from 'path';
import { promises as fs } from 'fs';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';

export abstract class AbstractExcel {
    private workbook;
    private worksheet;
    private filePath: string;
    private readonly configeService: ConfigService = new ConfigService();
    private readonly logger: CustomLoggerService = new CustomLoggerService();

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

    private async excelsPathDirectory() {
        const path = join(process.cwd(), `${this.configeService.get<string>('SALES_REPORT_STORAGE_PATH')}`);

        try {
            await fs.access(path);
        } catch {
            await fs.mkdir(path, { recursive: true });
            this.logger.info(`[Excel Abstract Servcie] Directory created: ${path}`);
        }

        return path;
    }
}
