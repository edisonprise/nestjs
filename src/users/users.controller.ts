import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersService.getUserByName(name);
    }
    return this.usersService.getUsers();
  }

  @Get('profile')
  getUserProfile(@Headers('token') token?: string) {
    if (token !== '1234') {
      return 'Sin acceso';
    }
    return 'Este endpoint retorna el perfil del usuario';
  }

  @Get('profile/images')
  getUserImages() {
    return 'Este endpoint retorna las imagenes del usuario';
  }

  @HttpCode(418)
  @Get('coffee')
  getCoffee() {
    return 'No se hacer cafe, soy una tetera';
  }

  @Get('message')
  getMessage(@Res() response: Response) {
    response.status(201).send('Este es un mensaje');
  }

  @Get('request')
  getRequest(@Req() request: Request) {
    console.log(request);
    return 'Esta rute logueq el request';
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }
  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put()
  updateUser() {
    return 'Este endpoint modifica un usuario';
  }

  @Delete()
  deleteUser() {
    return 'Este endpoint elimina un usuario';
  }
}
