import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    InternalServerErrorException,
    ForbiddenException,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
  import { EventService } from './events.service';

  @Controller('events')
  export class EventsController{
    constructor(private readonly eventService: EventService){}
    
    @Post()
    async addEvent(
        @Body('name') eventName: string,
        @Body('date') evenDate: string,
        @Body('startTime') eventST: string,
        @Body('duration') eventDuration: string,
        @Body('place') eventPlace: string,
        @Body('linkToEventPage') eventLTEP: string,
        @Body('imgURL') eventImgURL: string,
        @Body('imgALT') eventImgALT: string,
        @Body('description') eventDescription: string
    ){
        let newEvent;
        try {
            newEvent = await this.eventService.createEvent(
                eventName,
                evenDate,
                eventST,
                eventDuration,
                eventPlace,
                eventLTEP,
                eventImgURL,
                eventImgALT,
                eventDescription
            );
        } catch (error) {
         throw new InternalServerErrorException();   
        }
        if(!newEvent) throw new ForbiddenException();
        return newEvent;
    }

    @Get()
    async getAllEvents(){
        let allEvents;
        try {
            allEvents = await this.eventService.getAllEvents();
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(!allEvents) throw new NotFoundException();
        return allEvents;
    }

    @Get(':id')
    async getOneEventByID(
        @Param('id') eventID: string
    ){
        let oneEvent;
        try {
            oneEvent = await this.eventService.gatOneEventByID(eventID);
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(!oneEvent) throw new NotFoundException();
        return oneEvent;
    }

    @Put(':id')
    async updateOneEventByID(
        @Param('id') eventID: string,
        @Body('name') eventName: string,
        @Body('date') evenDate: string,
        @Body('startTime') eventST: string,
        @Body('duration') eventDuration: string,
        @Body('place') eventPlace: string,
        @Body('linkToEventPage') eventLTEP: string,
        @Body('imgURL') eventImgURL: string,
        @Body('imgALT') eventImgALT: string,
        @Body('description') eventDescription: string
    ){
        let updatedEvent;
        try {
            updatedEvent = await this.eventService.updateEvent(
                eventID,
                eventName,
                evenDate,
                eventST,
                eventDuration,
                eventPlace,
                eventLTEP,
                eventImgURL,
                eventImgALT,
                eventDescription
            )
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(!updatedEvent) throw new NotFoundException();
        return updatedEvent;
    }

    @Put('deactivate/:id')
    async deactivateEventByID(
        @Param('id') eventID: string
    ){
        let deactivatedEvent;
        try {
            deactivatedEvent = await this.eventService.updateEvent(
                eventID,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                false
                );
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(!deactivatedEvent) throw new NotFoundException();
        return deactivatedEvent;
    }


  }