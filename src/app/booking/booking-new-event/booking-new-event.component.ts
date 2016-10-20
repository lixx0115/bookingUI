import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search.service';
@Component({
  selector: 'app-booking-new-event',
  templateUrl: './booking-new-event.component.html',
  styleUrls: ['./booking-new-event.component.css']
})
export class BookingNewEventComponent implements OnInit {

  panelClass = ['panel', 'panel-success', 'panel-collapse', 'collapse'];
  searchResult: any
  constructor(private searcher: SearchService) { }

  toggleClass = ["glyphicon", "panel-right", "glyphicon-plus"]

  ngOnInit() {
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
    this.togglePanel()
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
