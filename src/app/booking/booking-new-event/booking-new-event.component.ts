import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { SearchService } from '../../search.service';
import { CalendarEventAction, CalendarEvent } from 'angular2-calendar/dist/esm/src';
import { CalendarComponent, ActionCallBack, EventCreationComponentData, EventCreationComponent } from '../../shared/'

import { EventService } from '../../event.service';
import { Event } from '../../event';
import { User } from '../../user';

declare var jQuery: any;
@Component({
  selector: 'app-booking-new-event',
  templateUrl: './booking-new-event.component.html',
  styleUrls: ['./booking-new-event.component.css']
})
export class BookingNewEventComponent implements OnInit, AfterViewInit {

  panelClass = ['panel', 'panel-success', 'panel-collapse', 'collapse'];

  searchResult: User[]

  selectResult: User;

  calendarShow: boolean = false;

  change: number = 0;

  @ViewChildren('calendar') calendars: QueryList<CalendarComponent>;

  calendar: CalendarComponent;

  constructor(private searcher: SearchService, private eventService: EventService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
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
        console.log(this.events);
        this.calendar.createCalendarEvent(this.events);
        console.log(this.calendar);
        console.log("change detected")
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
    this.selectResult = result;
    this.eventService.getProviderEvents(this.selectResult.userid).then(data => {
      this.events = data;
      this.togglePanel()
      this.datepickerClass = [];
    }
    );

  }

  onHourSegmentClicked(event: any) {

    this.modal.open(EventCreationComponent, new EventCreationComponentData(new Date(), this.selectResult.userName));
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
    console.log(input.date);
    that.viewDate = input.date;
    console.log(this.calendar);
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
