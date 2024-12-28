import { ApiResponse } from './api-response';

export class BaseController {
    apiResponse(data: any = null, message: string = null) {
        return new ApiResponse(data, message);
    }
}
