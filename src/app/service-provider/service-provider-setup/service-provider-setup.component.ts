import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jQuery: any;
@Component({
  selector: 'app-service-provider-setup',
  templateUrl: './service-provider-setup.component.html',
  styleUrls: ['./service-provider-setup.component.css']
})

export class ServiceProviderSetupComponent implements OnInit, AfterViewInit {

  daysOfWeek = ['Monday'
    , 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  dayblocked = ["block", "block", "block", "block", "block", "block", "block"]

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let options: any = {};
    options.formater = this.formate;
    options.min = 0;
    options.max = 24;
    options.min = 0;
    options.value = [9, 17];

    //jQuery('#slider0').slider(options);
    for (let day of this.daysOfWeek) {
      jQuery('#' + day).slider(options);
    }
  }

  onDayChecked(event: any, input: number) {
    console.log(input);
  }

  formate(input: number) {

    if (input > 12) {
      return (input - 12).toString() + ' pm'
    }
    return input.toString() + ' am';
  }

}
