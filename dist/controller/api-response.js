"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(data, message = null) {
        this.data = data;
        this.message = message;
    }
    response() {
        return {
            data: this.data,
            message: this.message
        };
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api-response.js.map