import { Component, OnInit, ElementRef } from '@angular/core';
import { SearchService } from '../../search.service';
import { CalendarEventAction, CalendarEvent } from 'angular2-calendar/dist/esm/src';

declare var jQuery: any;
@Component({
  selector: 'app-booking-new-event',
  templateUrl: './booking-new-event.component.html',
  styleUrls: ['./booking-new-event.component.css']
})
export class BookingNewEventComponent implements OnInit {

  panelClass = ['panel', 'panel-success', 'panel-collapse', 'collapse'];

  searchResult: any

  selectResult: { name: string, id: string }

  calendarShow: boolean = false;
  constructor(private searcher: SearchService, private elementRef: ElementRef) { }

  toggleClass = ["glyphicon", "panel-right", "glyphicon-plus"]



  ngOnInit() {
    jQuery("#datepicker").datepicker({
      autoclose: true
    }).on('hide', (e) => this.onDateSelected(e, this));
  }
  onSearch(searchTerm: string) {
    this.searcher.searchProvider(searchTerm).then(data => {
      this.searchResult = data;
      if (this.panelClass.length == 4) {
        this.togglePanel()
      }
    })

  }
  onSearchResultClicked(result: any) {
    this.selectResult = result;
    this.togglePanel()
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
