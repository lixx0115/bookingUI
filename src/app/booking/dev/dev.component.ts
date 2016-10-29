import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event';
import { FacebookService } from '../../facebook.service'
import { User } from '../../user'
import { CalendarComponent, ActionCallBack } from '../../shared/'
import { CalendarEvent } from 'angular2-calendar/dist/esm/src';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  events: Event[];

  currentUser: User;

  viewDate: Date = new Date();
  // modal: Modal;
  //  overlay: Overlay;
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
  constructor(private eventService: EventService, private facebook: FacebookService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    console.log(overlay, vcRef)
    overlay.defaultViewContainer = vcRef;
    //  this.overlay = overlay;
    //  console.log("in constructor ", this.overlay)
  }

  ngOnInit() {
    this.eventService.getConsumerEvents(this.facebook.currentUser.userid).then(
      data => {
        this.events = data;
        this.calendar.createCalendarEvent(this.events);
      }
    )

    this.currentUser = this.facebook.currentUser;


  }
  OnEventClicked(event: any) {
    /*    console.log(this)
        console.log(this.overlay, this.modal);
        if (!this.modal) {
          this.modal = new Modal(this.overlay);
        }
        */
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('A simple Alert style modal window')
      .body(`
            <h4>Alert is a classic (title/body/footer) 1 button modal window that 
            does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non blocking (click anywhere outside to dismiss)</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>HTML content</li>
            </ul>`)
      .open();
  }

  hourSegmentClicked(event: any) {
    console.log(event.date)
    console.log(this.currentUser)
  }
}
