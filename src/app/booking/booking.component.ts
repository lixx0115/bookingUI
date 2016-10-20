import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from '../facebook.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css',]
})
export class BookingComponent implements OnInit {

  constructor(private router: Router, private facebook: FacebookService) { }

  ngOnInit() {
    this.router.navigate(['booking', 'home']);
  }

}
