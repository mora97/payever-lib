export declare class ExcelService {
    private readonly fileName;
    private workbook;
    private worksheet;
    constructor(fileName: string);
    columns(): void;
    rows(): any[];
    private prepareExcel;
}
