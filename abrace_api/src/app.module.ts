import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdmsModule } from './adms/adms.module';
require('dotenv/config')


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_STRING), PetsModule, AdmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
