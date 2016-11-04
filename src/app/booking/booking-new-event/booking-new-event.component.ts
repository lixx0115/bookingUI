import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { SearchService } from '../../search.service';
import { CalendarEventAction, CalendarEvent } from 'angular2-calendar/dist/esm/src';
import { CalendarComponent, ActionCallBack, EventCreationComponentData, EventCreationComponent } from '../../shared/'

import { EventService } from '../../event.service';
import { Event } from '../../event';
import { User } from '../../user';
import { FacebookService } from '../../facebook.service';
declare var jQuery: any;
@Component({
  selector: 'app-booking-new-event',
  templateUrl: './booking-new-event.component.html',
  styleUrls: ['./booking-new-event.component.css']
})
export class BookingNewEventComponent implements OnInit, AfterViewInit {

  panelClass = ['panel', 'panel-success', 'panel-collapse', 'collapse'];

  searchResult: User[];

  selectProvider: User;

  currentLoginUser: User;

  calendarShow: boolean = false;

  change: number = 0;

  @ViewChildren('calendar') calendars: QueryList<CalendarComponent>;

  calendar: CalendarComponent;

  constructor(private faceBookService: FacebookService, private searcher: SearchService, private eventService: EventService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  toggleClass = ["glyphicon", "panel-right", "glyphicon-plus"]

  datepickerClass = ["hidden "]

  events: Event[];

  ngOnInit() {
    jQuery("#datepicker").datepicker({
      autoclose: true
    }).on('hide', (e) => this.onDateSelected(e, this));
  }

  ngAfterViewInit() {
    this.calendars.changes.subscribe(
      (comps: QueryList<CalendarComponent>) => {

        this.calendar = comps.first;

        this.calendar.createCalendarEvent(this.events);

        this.change += 1;
      }
    )
  }

  onSearch(searchTerm: string) {
    this.searcher.searchProvider(searchTerm).then(data => {
      this.searchResult = data;
      if (this.panelClass.length == 4) {
        this.togglePanel()
        // this.events = (<Event[]>data);
      }
    })

  }
  onSearchResultClicked(result: any) {
    this.selectProvider = result;
    this.eventService.getProviderEvents(this.selectProvider.userid).then(data => {

      this.events = data;
      this.togglePanel()
      this.datepickerClass = [];
    }
    );

  }

  onHourSegmentClicked(event: any) {
    this.modal.open(EventCreationComponent, overlayConfigFactory(
      new EventCreationComponentData(
        event.date,
        this.selectProvider.userName,
        this.faceBookService.currentUser.userName,
        this.selectProvider.userid,
        this.faceBookService.currentUser.userid,
        (event) => { this.onEventCreated(event) }
      ), BSModalContext)).then
      (() => console.log("modal closed"));
  }

  onEventCreated(createdEvent: Event) {
    console.log("react to crate", createdEvent)
    this.events.push(createdEvent);
    this.events = this.events.slice();
  }

  onEventClicked(event: any) {

    console.log(event)
    //  this.modalClass = this.editEvent;
  }
  onHourClicked($event) {
    console.log($event)
  }

  onDateSelected(input: any, that: any) {


    this.calendarShow = true
    that.viewDate = input.date;
  }

  togglePanel() {
    console.log(this.panelClass.length);
    if (this.panelClass.length == 4) {
      this.panelClass.push('in');
      this.toggleClass[2] = "glyphicon-minus";
    } else {
      this.panelClass.pop();
      this.toggleClass[2] = "glyphicon-plus";
    }
  }
}
