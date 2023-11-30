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
      throw new InternalServerErrorException();
    }
    if (!newUser)
      throw new ForbiddenException();
    return newUser;
  }

  @Get()
  async getAllUsers() {
    let allUsers;
    try {
      allUsers = await this.usersService.getAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (!allUsers) throw new NotFoundException();
    return allUsers;
  }

  @Get(':id')
  async getUserByID(@Param('id') userID: string) {
    let oneUser;
    try {
      oneUser = await this.usersService.getOne(userID);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (!oneUser) throw new NotFoundException();
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
      throw new InternalServerErrorException();
    }
    if (!updatedUser)
      throw new NotFoundException();
    return updatedUser;
  }
  @Put('disable/:id')
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
      throw new InternalServerErrorException();
    }
    if (!desabledUser)
      throw new NotFoundException();
    return desabledUser;
  }
  @Put('reactivate/:id')
  async reactivateAccount(@Param('id') oldUserID: string) {
    let activatedUser;
    try {
      activatedUser = await this.usersService.putOne(
        oldUserID,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if(!activatedUser) throw new NotFoundException();
    return activatedUser;
  }
}
