import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://IsaacTestUser:GNPyk0jHZZgOKtKc@isaacdb.ckyhcqw.mongodb.net/abracebeta?retryWrites=true&w=majority"), PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
