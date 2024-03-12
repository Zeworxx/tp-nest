import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class JsonService {
  async createEmptyJsonFileIfNotExists(filePath: string): Promise<void> {
    try {
      await fs.promises.access(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.promises.writeFile(filePath, '[]');
        console.log(`File ${filePath} created`);
      }
    }
  }
}
