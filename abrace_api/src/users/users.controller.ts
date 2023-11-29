import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  InternalServerErrorException,
  ForbiddenException,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') //apiURL/users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    //user is born "naked"
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('pass') userPass: string,
    @Body('whatsApp') userWhatsApp: string,
  ) {
    let newUser;
    try {
      newUser = await this.usersService.createUser(
        userName,
        userEmail,
        userPass,
        userWhatsApp,
      );
    } catch (error) {
      throw new InternalServerErrorException('se cagou ao criar usuário');
    }
    if (!newUser)
      throw new ForbiddenException(
        'Outro fdp com esse email ja está cadastrado',
      );
    return newUser;
  }

  @Get()
  async getAllUsers() {
    let allUsers;
    try {
      allUsers = await this.usersService.getAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Se cagou pegando a lista de usuários',
      );
    }
    if (!allUsers) throw new NotFoundException('gif do John Travolta');
    return allUsers;
  }

  @Get(':id')
  async getUserByID(@Param('id') userID: string) {
    let oneUser;
    try {
      oneUser = await this.usersService.getOne(userID);
    } catch (error) {
      throw new InternalServerErrorException(
        'Se cagou ao tentar pegar esse usuários',
      );
    }
    if (!oneUser) throw new NotFoundException('Num tem nenhum FDP com essa ID');
    return oneUser;
  }

  @Put(':id')
  async updateOneUserById(
    @Param('id') userID: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('pass') userPass: string,
    @Body('whatsApp') userWhatsApp: string,
  ) {
    let updatedUser;
    try {
      updatedUser = await this.usersService.putOne(
        userID,
        userName,
        userEmail,
        userPass,
        userWhatsApp,
        undefined,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'se cagou ao tentar mudar esse usuário',
      );
    }
    if (!updatedUser)
      throw new ForbiddenException('Não consegui modificar esse fdp');
    return updatedUser;
  }
  @Put('desable/:id')
  async desableUserById(@Param('id') userID: string) {
    let desabledUser;
    try {
      desabledUser = await this.usersService.putOne(
        userID,
        undefined,
        undefined,
        undefined,
        undefined,
        false,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Se cagou ao desabilitar esse usuário',
      );
    }
    if (!desabledUser)
      throw new ForbiddenException('Não consegui desabilitar essa porra');
    return desabledUser;
  }
}
