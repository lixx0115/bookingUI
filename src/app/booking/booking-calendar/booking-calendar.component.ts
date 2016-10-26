import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarEventAction, CalendarEvent } from 'angular2-calendar/dist/esm/src';
import { CalendarComponent, ActionCallBack } from '../../shared/'
import { EventService } from '../../event.service';
import { FacebookService } from '../../facebook.service'
import { Event } from '../../event';
@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',


})
export class BookingCalendarComponent implements OnInit {
  view: string = 'month';

  viewDate: Date = new Date();

  editEvent: string = 'modal show'
  hideModal: string = 'modal fade'

  modalClass: string = this.hideModal;

  selectEvent: CalendarEvent;



  events: Event[]

  activeDayIsOpen: boolean = true;

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

    this.selectEvent = event.event
    console.log(this.selectEvent.title)
    this.modalClass = this.editEvent;
  }

  OnSave() {
    this.modalClass = this.hideModal;
  }
  OnCancel() {
    this.modalClass = this.hideModal;
  }

}