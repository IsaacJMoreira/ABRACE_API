import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdmSchema } from './adm.model';
import { AdmsController } from './adms.controller';
import { AdmService } from './adms.service';


@Module({
    imports:[MongooseModule.forFeature([{name: 'Adm', schema: AdmSchema}])],
    controllers: [AdmsController],
    providers: [AdmService]
})
export class AdmsModule {}