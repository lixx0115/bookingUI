import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { UserService } from '../../user.service';
import { User } from '../../user'
import { FacebookService } from '../../facebook.service';
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

  hoursBlocks = ["9,17", "9,17", "9,17", "9,17", "9,17", "9,17", "9,17"]

  user: User;

  providerSetupForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private facebookService: FacebookService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.facebookService.currentUser;
    this.createEditForm(this.user);

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

  onSubmit() {
    console.log(this.providerSetupForm.value);
    let provider: any = {}

    let checkDays = this.providerSetupForm.value.availableHours;
    this.user.cellNumber = this.providerSetupForm.value.cellPhone;
    this.user.email = this.providerSetupForm.value.email;
    this.user.isProvider = true;

    provider.tags = this.providerSetupForm.value.tags.split(',');
    provider.description = this.providerSetupForm.value.description;
    provider.website = this.providerSetupForm.value.website;
    provider.hoursAvailable = this.extractAvailableHours(checkDays);
    this.user.provider = provider;
    this.facebookService.SaveUserProfile(this.user).then(() => alert("done"))

    console.log(this.user);
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

  private createEditForm(user: User) {
    let tags = user.provider && user.provider.tags && user.provider.tags.join() || '';
    this.providerSetupForm = this.formBuilder.group(
      {

        username: new FormControl(user.userName, [Validators.required]),
        cellPhone: new FormControl(user.cellNumber, [Validators.required]),
        email: new FormControl(user.email, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
        tags: new FormControl(tags, [Validators.required]),
        description: new FormControl(user.provider && user.provider.description || '', [Validators.required]),
        website: new FormControl(user.provider && user.provider.website || ''),
        availableHours: this.formBuilder.array([
          new FormControl(),
          new FormControl(),
          new FormControl(),
          new FormControl(),
          new FormControl(),
          new FormControl(),
          new FormControl()
        ],

        )
      })
  }


  private extractAvailableHours(checkDays: any) {
    let setHours: any = {};
    let hours = new Array<{ start: number, end: number }>();

    for (let day of this.daysOfWeek) {
      let hoursplit = jQuery('#' + day).slider('getValue')[0].value.split(',');
      hours.push({ start: +hoursplit[0], end: +hoursplit[1] });
    }

    for (let i = 0; i < checkDays.length; i++) {
      if (checkDays[i]) {
        setHours[this.daysOfWeek[i]] = { blocked: false, start: hours[i].start, end: hours[i].end }
      }
      else {
        setHours[this.daysOfWeek[i]] = { blocked: true, start: 9, end: 17 }
      }
    }
    return setHours;
  }

}
