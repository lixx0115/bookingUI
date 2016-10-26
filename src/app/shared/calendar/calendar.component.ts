import { Component, Input, ApplicationRef } from '@angular/core';
import { CalendarEventAction, CalendarEvent } from 'angular2-calendar/dist/esm/src';
import { Event } from '../../Event';
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
  subMonths
} from 'date-fns';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {

  _viewDate: Date = new Date()

  @Input() view: string = 'month';

  @Input() showNav: boolean;

  @Input() public set viewDate(value: Date) {
    this._viewDate = value
  }

  public get viewDate() {
    return this._viewDate;
  }

  @Input() onEventClicked;

  @Input() onEventEdit: ActionCallBack;

  @Input() onEventCancel: ActionCallBack;

  @Input() change: number;

  @Input() dayEndHour: number = 21;

  @Input() dayStartHour: number = 6;

  _events: Event[] = new Array<Event>();


  calendarEvents = new Array<CalendarEvent>();



  @Input() public set events(value: Event[]) {
    this._events = value;
    this.createCalendarEvent(this._events);
  }


  selectEvent: CalendarEvent;

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: { event: CalendarEvent }): void => {
      this.onEventEdit(event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: { event: CalendarEvent }): void => {
      this.onEventCancel(event).then(
        (result) => {
          this.calendarEvents = this.calendarEvents.filter(iEvent => iEvent !== event);
        })
    }
  }];


  activeDayIsOpen: boolean = true;

  constructor(private appRef: ApplicationRef) {

  }

  createCalendarEvent(events: Event[]) {
    this._events = events;
    let newCalendarEvents = Array<CalendarEvent>();
    for (let event of this._events) {
      newCalendarEvents.push(
        {
          start: event.start,
          end: event.end,
          title: event.title,
          actions: this.actions,
          color: colors.blue
        }

      )
    }

    this.calendarEvents = newCalendarEvents;
  }

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);

  }

  decrement(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDate = subFn(this.viewDate, 1);

  }

  today(): void {
    this.viewDate = new Date();
  }

  dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }




}

export interface ActionCallBack {
  (event: CalendarEvent): Promise<boolean>;
}