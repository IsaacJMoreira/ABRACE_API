import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv/config')


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_STRING), PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
