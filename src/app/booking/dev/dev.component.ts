import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event';
import { FacebookService } from '../../facebook.service'
import { CalendarComponent, ActionCallBack } from '../../shared/'
import { CalendarEvent } from 'angular2-calendar/dist/esm/src';
@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  events: Event[];

  onEdit: ActionCallBack = function (event: CalendarEvent): Promise<boolean> {
    return new Promise<boolean>((fulfill, reject) => {
      console.log(event);
      fulfill(true);
    });
  }

  onCancel: ActionCallBack = function (event: CalendarEvent): Promise<boolean> {
    return new Promise<boolean>((fulfill, reject) => {
      console.log(event);
      fulfill(true);
    });
  }


  @ViewChild(CalendarComponent) calendar: CalendarComponent;
  constructor(private eventService: EventService, private facebook: FacebookService) { }

  ngOnInit() {
    this.eventService.getConsumerEvents(this.facebook.currentUser.userid).then(
      data => {
        this.events = data;
        this.calendar.createCalendarEvent(this.events);
      }
    )

  }
  OnEventClicked(event: any) {
    console.log(event);
  }
}
