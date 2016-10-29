import { Injectable } from '@angular/core';
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
    //  return this.firebase.getData([userid, "consumer"]);

    return this.getSampleData(this.events);

  }
  public getProviderEvents(userid: string): Promise<Event[]> {

    return this.getSampleData(this.events.slice(1, +userid + 1))

    // return this.firebase.getData([userid, "provider"]);
  }
  public SaveEvent(consumerId: string, providerId: string, event: Event) {
    var dateKey = this.firebase.generateKeyFromDate(event.start);
    return this.firebase.putData([providerId, "event", dateKey], event)
  }





}
