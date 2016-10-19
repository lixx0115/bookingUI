import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../../facebook.service'
@Component({
  selector: 'app-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.css']
})
export class BookingHomeComponent implements OnInit {

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
  }

}
