import { Component, Output, EventEmitter } from '@angular/core';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { addHours } from 'date-fns';
import { EventService } from '../../event.service';
import { Event, Party } from '../../event';
import { User } from '../../user';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";

export class EventCreationComponentData extends BSModalContext {

  constructor(public date: Date, public provider: User, public consumer: User, public onEventCreated: any) {
    super();
  }
}
@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styles: [`
        .custom-modal-container {
            padding: 15px;
        }
        .right{
           float: right;
            margin-right: 15px;
            margin-top: 5px;
        }
        .custom-modal-header {
            background-color: #219161;
            color: #fff;
            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            margin-top: -15px;
            margin-bottom: 40px;
        }
    `]
})
export class EventCreationComponent implements ModalComponent<EventCreationComponentData> {

  context: EventCreationComponentData;

  eventCreationForm: FormGroup;

  start: Date;

  end: Date;

  title: string;

  showWarning: boolean = false;

  errorMessage: string = '';

  @Output() eventCreated = new EventEmitter<Event>();

  constructor(public dialog: DialogRef<EventCreationComponentData>, private eventService: EventService, private formBuilder: FormBuilder) {
    console.log(dialog)
    this.context = dialog.context;
    this.start = this.context.date;
    this.end = addHours(this.context.date, 1);
    this.title = 'event with ' + this.context.provider.userName;

    this.eventCreationForm = this.formBuilder.group(
      {

        title: new FormControl(this.title, Validators.required),
        start: new FormControl(this.start, Validators.required),
        end: new FormControl(this.end, Validators.required),
      }
    )

  }

  onCancel() {
    this.dialog.close();
  }

  onFocus() {
    this.showWarning = false;
  }

  onSubmit() {
    //  this.eventService.SaveEvent(this.context.providerName)
    let newEvent = new Event();
    let provider = new Party();
    let consumer = new Party();
    provider.id = this.context.provider.userid;
    provider.name = this.context.provider.userName;
    provider.isProvider = true;
    consumer.id = this.context.consumer.userid;
    consumer.name = this.context.consumer.userName;
    consumer.isProvider = false;

    newEvent.allDay = false;
    newEvent.start = new Date(this.eventCreationForm.value.start);
    newEvent.end = new Date(this.eventCreationForm.value.end);
    newEvent.title = this.eventCreationForm.value.title;
    newEvent.party.push(provider);
    newEvent.party.push(consumer);


    console.log(newEvent);
    this.eventService.getProviderEventsByDate(provider.id, newEvent.start).then((dayEvents) => {
      return Event.isOverlapWithEvents(newEvent, dayEvents);
    }
    ).then((isOverlap) => {
      if (isOverlap) {
        this.errorMessage = "Overlap with other event";
        this.showWarning = true;
      }
      else if (!User.IsAllowed(newEvent, this.context.provider)) {
        this.errorMessage = "Block by provider";
        this.showWarning = true;
      }
      else {
        this.eventService.CreateEvent(this.context.consumer.userid, this.context.provider.userid, newEvent).then(
          (data) => {
            this.context.onEventCreated(data);

            console.log("created", data); this.dialog.close();
          }
        )
      }
    }

      );

  }

}
