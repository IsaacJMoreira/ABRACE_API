import { Controller, Post, Body, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { AdmService } from './adms.service';

@Controller('adms')
export class AdmsController{
    constructor(private readonly admService: AdmService){}

    @Post()
    async addAdm( 
        @Body('name') admName: string,
        @Body('email') admEmail: string,
        @Body('pass') admPass: string,
        @Body('credenctial') admCredential: string
    )
    {
        let generatedID;
        try{
        generatedID = await this.admService.createAdm(
            admName,
            admEmail,
            admPass,
            admCredential
        );       
        } catch(error){
            throw new InternalServerErrorException('Mongo DB se cagou ao criar esse adm')
        }
        if(!generatedID) throw new ForbiddenException("Já tem aguém com esse email, carai!!!")
        return {ID: generatedID};
    }

}