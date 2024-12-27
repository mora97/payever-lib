export declare class ApiResponse {
    private readonly data;
    private readonly message;
    constructor(data: any, message?: string);
    response(): {
        data: any;
        message: string;
    };
}
