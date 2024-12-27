export declare abstract class AbstractExcel {
    private workbook;
    private worksheet;
    private filePath;
    private readonly configeService;
    private readonly logger;
    constructor();
    protected columns(): any[];
    protected rows(): any[];
    protected fileName(): string;
    make(): Promise<this>;
    get getFilePath(): string;
    private excelsPathDirectory;
}
