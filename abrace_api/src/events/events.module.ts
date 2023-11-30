import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./event.model";
import { EventsController } from "./events.controller";
import { EventService } from "./events.service";


@Module({
imports:[MongooseModule.forFeature([{name: 'Event', schema: EventSchema}])],
controllers:[EventsController],
providers: [EventService]
})
export class EventsModule{};