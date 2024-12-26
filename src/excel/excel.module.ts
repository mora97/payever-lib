import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Module({
    providers: [ExcelService],
    exports: [ExcelModule]
})
export class ExcelModule {}
