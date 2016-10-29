import { Component } from '@angular/core';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class EventCreationComponentData extends BSModalContext {

  constructor(public date: Date, public providerName: string) {
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

        .custom-modal-header {
            background-color: #219161;
            color: #fff;
            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            margin-top: -15px;
            margin-bottom: 40px;
        }
    `],
})
export class EventCreationComponent implements ModalComponent<EventCreationComponentData> {
  context: EventCreationComponentData;

  constructor(public dialog: DialogRef<EventCreationComponentData>) {
    console.log(dialog)
    this.context = dialog.context;
  }



}
