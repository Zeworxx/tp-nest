import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from 'src/config/config.service';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post()
  async addUser(
    @Body() user: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const response = await this.userService.addUser(user);
      res.send(response);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getUsers(@Res() res: Response): Promise<void> {
    try {
      const response = await this.userService.getUsers();
      if (!response) {
        res.sendStatus(HttpStatus.NOT_FOUND);
      }
      res.send(response);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get('config/:option')
  async getDbType(
    @Param('option') option: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const config = this.configService.getValue(option);
      if (!config) {
        res.sendStatus(HttpStatus.NOT_FOUND);
      }
      res.send(config);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
