import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { CustomLoggerService } from './custom-logger/custom-logger.service';

// TODO: think about it (to be in a class with file.service or not)
const logger = new CustomLoggerService()

export const downloadFile = (
    response: Response, 
    filePath: string, 
    fileName: string = 'file.xlsx'
) => {
    const path = join(process.cwd(), filePath)
    
    const fileStream = fs.createReadStream(path);

    fileStream.on('end', () => {
        try {
            fs.unlinkSync(path);
        } catch (error) {
            logger.error('An error occurred while removing the file.')
            throw new BadRequestException('An error occurred while removing the file.');
        }
    });

    response.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${fileName}`
    });

    response.sendFile(path);
}