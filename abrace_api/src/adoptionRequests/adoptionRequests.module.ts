import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionRequestsController } from './adoptionRequests.controller';
import { AdoptionRequestsService } from './adoptionRequests.service';
import { AdoptionRequestSchema } from './adoptionRequest.model';
import { PetSchema } from 'src/pets/pet.model';
import { UserSchema } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
import { PetsModule } from 'src/pets/pets.module';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'AdoptionRequest', schema: AdoptionRequestSchema },
        { name: 'Pet', schema: PetSchema },
        { name: 'User', schema: UserSchema },
    ]),
    UsersModule,
    PetsModule
],
    controllers: [
        AdoptionRequestsController,        
    ],
    providers: [
        AdoptionRequestsService,       
    ],
  })
  export class AdoptionRequestModule {}