"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const api_response_1 = require("./api-response");
class BaseController {
    apiResponse(data = null, message = null) {
        return new api_response_1.ApiResponse(data, message);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map