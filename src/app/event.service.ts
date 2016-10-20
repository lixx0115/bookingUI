import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Event } from './event';
@Injectable()
export class EventService {

  constructor(private firebase: FirebaseService) { }

  public getConsumerEvents(userid: string): Promise<Event> {
    return this.firebase.getData([userid, "consumer"]);
  }
  public getProviderEvents(userid: string): Promise<Event> {
    return this.firebase.getData([userid, "provider"]);
  }
  public SaveEvent(consumerId: string, providerId: string, event: Event) {
    var dateKey = this.generateKeyFromDate(event.start);
    return this.firebase.putData([providerId, "event", dateKey], event)
  }

  private generateKeyFromDate(input: Date) {

    var curr_date = input.getDate();
    var curr_month = input.getMonth() + 1; //Months are zero based
    var curr_year = input.getFullYear();
    return curr_year + "-" + curr_month + "-" + curr_date;
  }
}
