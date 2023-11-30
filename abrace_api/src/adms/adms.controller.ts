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
    let newADM;
    try {
      newADM = await this.admService.createAdm(
        admName,
        admEmail,
        admPass,
        admCredential,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (!newADM)
      throw new ForbiddenException();
    return newADM;
  }

  @Get()
  async getAll() {
    let allADMs;

    try {
      allADMs = this.admService.getAdms();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!allADMs) throw new NotFoundException();
    return allADMs;
  }

  @Get(':id')
  async getById(@Param('id') admID: string) {
    let specificADM;

    try {
      specificADM = await this.admService.getADMByID(admID);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!specificADM)
      throw new NotFoundException();

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
      throw new InternalServerErrorException();
    }
    if (response == 1)
      throw new ForbiddenException();
    if(response == 2) throw new NotFoundException();
    return response;
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
      throw new InternalServerErrorException();
    }

    if (!response)
      throw new NotFoundException();

    return response._id;
  }

  @Put('disable/:id')
  async desableADM(@Param('id') admID: string){
    let disabledADM;
    try {
      disabledADM = await this.admService.disableADMbyID(admID);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if(!disabledADM) throw new NotFoundException();
    return disabledADM;
  }
}
