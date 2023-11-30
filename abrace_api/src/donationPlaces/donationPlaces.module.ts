import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { DonationPlaceSchema } from './donationPlace.model';
import { DonationPlacesController } from './donationPlaces.controller';
import { DonationPlacesService } from './donationPlaces.service';
@Module({
    imports:[MongooseModule.forFeature([{name: 'DonationPlace', schema: DonationPlaceSchema}])],
    controllers: [DonationPlacesController],
    providers: [DonationPlacesService],
})
export class DonationPlaceModule{}