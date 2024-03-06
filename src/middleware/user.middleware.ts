import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private cpt = 0;
  use(req: Request, res: Response, next: NextFunction) {
    this.cpt++;
    console.log(`Attempt to add user : ${this.cpt}`);
    next();
  }
}
