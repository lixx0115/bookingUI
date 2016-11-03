import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { FirebaseService } from './firebase.service';
import { Event } from './event';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  subHours
} from 'date-fns';

@Injectable()
export class EventService {

  events: Event[] = new Array<Event>();

  constructor(private firebase: FirebaseService) {
    for (let i = 0; i < 4; i++) {
      this.events.push(
        {
          start: subHours(new Date(), i + 3),
          end: subHours(new Date(), i + 2),
          title: 'my ' + i + ' hour event',
          party: [
            { id: '1', name: 'great teach', isProvider: true },
            { id: '2', name: 'super mom', isProvider: false }

          ]

        }
      )
    }


  }

  private getSampleData(events: Event[]) {
    return new Promise((fulfill, reject) => { fulfill(events) })
  }



  public getConsumerEvents(userid: string): Promise<Event[]> {
    // return this.firebase.getData([userid, "consumer"]);

    return this.firebase.getData([userid, 'event']).then((result) => { return this.getEventArrayFromEventJson(result) });
    //  return this.getSampleData(this.events);

  }
  public getProviderEvents(userid: string): Promise<Event[]> {

    //  return this.getSampleData(this.events.slice(1, +userid + 1))

    return this.firebase.getData([userid, 'event']).then((result) => { return this.getEventArrayFromEventJson(result) });
  }

  public getProviderEventsByDate(userid: string, date: Date): Promise<Event[]> {

    var dateKey = this.firebase.generateKeyFromDate(date);
    return this.firebase.getData([userid, 'event', dateKey]).then((result) => { return this.getEventArrayFromDayEventJson(result) });
  }


  public CreateEvent(consumerId: string, providerId: string, event: Event): Promise<Event> {
    var dateKey = this.firebase.generateKeyFromDate(event.start);
    return this.firebase.postData([providerId, "event", dateKey], event).then((data) => {
      let eventResponse = (<Response>data).json();
      let eventKey = eventResponse.name;
      event.id = eventKey;
      return this.firebase.putData([consumerId, "event", dateKey, eventKey], event)
    }).then(() => { return event });
  }

  private getEventArrayFromEventJson(eventJson: any): Event[] {

    let result = new Array<Event>();
    if (eventJson === null) {
      return result;
    }
    for (let dayKey of Object.keys(eventJson)) {
      let dayJson = eventJson[dayKey];
      result = result.concat(this.getEventArrayFromDayEventJson(dayJson));
    }

    return result;

  }
  private getEventArrayFromDayEventJson(dayJson: any): Event[] {
    let result = new Array<Event>();
    if (dayJson === null) {
      return result;
    }
    for (let eventId of Object.keys(dayJson)) {
      var event = dayJson[eventId];
      event.id = eventId;
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      result.push(event);
    }
    return result;
  }



}
