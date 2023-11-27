import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AdmService } from './adms.service';
import { response } from 'express';

@Controller('adms')
export class AdmsController {
  constructor(private readonly admService: AdmService) {}

  @Post()
  async add(
    @Body('name') admName: string,
    @Body('email') admEmail: string,
    @Body('pass') admPass: string,
    @Body('credenctial') admCredential: string,
  ) {
    let generatedID;
    try {
      generatedID = await this.admService.createAdm(
        admName,
        admEmail,
        admPass,
        admCredential,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Mongo DB se cagou ao criar esse adm',
      );
    }
    if (!generatedID)
      throw new ForbiddenException('Já tem aguém com esse email, carai!!!');
    return { ID: generatedID };
  }

  @Get()
  async getAll() {
    let allADMs;

    try {
      allADMs = this.admService.getAdms();
    } catch (error) {
      throw new InternalServerErrorException(
        'Mongo DB se cagou ao pegar todos os adms',
      );
    }

    if (!allADMs) throw new NotFoundException('Num achei foi nada!');
    return allADMs;
  }

  @Get(':id')
  async getById(@Param('id') admID: string) {
    let specificADM;

    try {
      specificADM = await this.admService.getADMByID(admID);
    } catch (error) {
      throw new InternalServerErrorException(
        'Mongo DB de cagou a tentar encontrar um adm especifico',
      );
    }

    if (!specificADM)
      throw new NotFoundException('Não achei esse adm ai q vc falou');

    return specificADM;
  }

  @Put(':id')
  async updateADM_NoCredential(
    @Param('id') admID: string,
    @Body('name') newName: string,
    @Body('pass') newPass: string,
    @Body('email') newEmail: string,
  ) {
    let response;
    try {
      response = await this.admService.putADMByID_NoCredential(
        admID,
        newName,
        newEmail,
        newPass,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'MongoDB se cagou ao tentar fzr esse update',
      );
    }
    if (response == 2)
      throw new ForbiddenException('Já existe alguém com esse E-MAIL');
    return response._id;
  }

  @Put('promote/:id')
  async updateCredential(
    @Param('id') admID: string,
    @Body('credential') newAdmCredential: string,
  ) {
    let response;
    try {
      response = await this.admService.changeCredential(
        admID,
        newAdmCredential,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Se cagou ao tentar mudar essa credencial',
      );
    }

    if (!response)
      throw new NotFoundException('Num encontrei ngm pra promover');

    return response._id;
  }

  @Delete(':id')
  async deleteAdmByID(@Param('id') admID: string) {
    let response;
    try {
      response = await this.admService.deleteById(admID);
    } catch (error) {
      throw new InternalServerErrorException(
        'mongoDB se cagou ao tentar deletar o ADM',
      );
    }
    if (response.deletedCount == 0)
      throw new NotFoundException('Ninguém assim pra ser deletado!');
    return response;
  }
}
