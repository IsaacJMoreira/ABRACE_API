import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async createEvent(
    name: string,
    date: string,
    startTime: string,
    duration: string,
    place: string,
    linkToEventPage: string,
    imgURL: string,
    imgALT: string,
    description: string,
  ) {
    const istaken = await this.eventModel.countDocuments({ name: name });

    if (!istaken) {
      const newEvent = await new this.eventModel({
        name,
        date,
        startTime,
        duration,
        place,
        linkToEventPage,
        imgURL,
        imgALT,
        description,
      }).save();
      return newEvent;
    }
    return false;
  }

  async getAllEvents() {
    const allEvents = await this.eventModel.find();
    if (allEvents.length < 1) return false;
    return allEvents;
  }

  async gatOneEventByID(id: string) {
    const oneEvent = await this.eventModel.findById(id);
    if (!oneEvent) return false;
    return oneEvent;
  }

  async updateEvent(
    id: string,
    name: string,
    date: string,
    startTime: string,
    duration: string,
    place: string,
    linkToEventPage: string,
    imgURL: string,
    imgALT: string,
    description: string,
    active?: boolean
  ){
    const updatedEvent = await this.eventModel.findByIdAndUpdate({_id: id},{
        name,
        date,
        startTime,
        duration,
        place,
        linkToEventPage,
        imgURL,
        imgALT,
        description,
        active
    },{new: true});
    if(!updatedEvent) return false;
    return updatedEvent;
  }
}
