import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    InternalServerErrorException,
    NotFoundException,
    ForbiddenException,
    BadRequestException
  } from '@nestjs/common';
  import { AdoptionRequestsService } from './adoptionRequests.service';


  @Controller('adoptionrequests')
  export class AdoptionRequestsController{
    constructor(private readonly adoptionRequestsService: AdoptionRequestsService){}

    @Post()
    async addAdoptionRequest(
        @Body('userID') userID : string,
        @Body('petID') petID : string,
        @Body('userName') userName : string,
        @Body('petName') petName : string,
    ){
        let newAdoptionRequest;
        try {
            newAdoptionRequest = await this.adoptionRequestsService.addNewAdoptionRequest(
                userID,
                petID,
            )
            if(newAdoptionRequest == -1) throw new Error();
            if(newAdoptionRequest == 4) throw new Error('FATAL: lonst data sync')
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(newAdoptionRequest == 0) throw new ForbiddenException("Usuário e/ou Animal inexixtente(s)");        
        if(newAdoptionRequest == 1) throw new ForbiddenException("Usuário inativo");
        if(newAdoptionRequest == 2) throw new ForbiddenException("Usuário deve responder ao questionário");
        if(newAdoptionRequest == 3) throw new ForbiddenException("Animal não está ativo");
        return newAdoptionRequest;
    }

    @Get('/period/:min?/:max?')
    async getAdoptionRequestsByPeriod(
        @Param('min') dateMin:  string,
        @Param('max') dateMax: string
    ){
        let requests;
        try {
            requests = await this.adoptionRequestsService.getAdoptionRequestsByQuery(dateMin, dateMax)
        } catch (error) {
            throw new InternalServerErrorException();        
        }
        if(requests == -1) throw new BadRequestException();
        if(requests == 1) throw new NotFoundException();
        return requests;
    }

    @Get('/petid/:petID')
    async getAdoptionRequestsByPetID(
        @Param('petID') petID: string
    ){
        let requests;
        try {
            requests = await this.adoptionRequestsService.getAdoptionRequestByPetID(petID)
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(requests == 0) throw new NotFoundException();
        return requests
    }

    @Get('/userid/:userID')
    async getAdoptionRequestsByUserID(
        @Param('userID') userID: string
    ){
        let requests;
        try {
            requests = await this.adoptionRequestsService.getAdoptionRequestByUserID(userID)
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(requests == 0) throw new NotFoundException();
        return requests
    }

    @Put(':id')
    async updanteGrantOfAdoptionRequest(
        @Param('id') requestID: string,
        @Body('grant') grant: string
    ){
        let updatedRequest;
        try {
            updatedRequest = await this.adoptionRequestsService.updateAdoptionRequestGrant(requestID, grant);
        } catch (error) {
          throw new InternalServerErrorException();  
        }
        if(updatedRequest == 0) throw new NotFoundException();
        return updatedRequest;
    }


  }