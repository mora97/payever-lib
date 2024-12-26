export class ApiResponse {
    constructor(
        private readonly data: any,
        private readonly message: string = null
    ) {}

    response() {
        return {
            data: this.data,
            message: this.message
        }
    }
}