export declare abstract class AbstractExcel {
    private workbook;
    private worksheet;
    private filePath;
    private readonly configeService;
    constructor();
    protected columns(): any[];
    protected rows(): any[];
    protected fileName(): string;
    make(): Promise<this>;
    get getFilePath(): string;
}
