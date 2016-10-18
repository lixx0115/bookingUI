import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {
  user = {
    username: "what is a name",
    email: "name@mno.com",
    password: "baddd",
    gender: ""
  };
  genders = ['male', 'female'];

  constructor() { }

  ngOnInit() {
  }
  onSumbit(form: NgForm) {
    // console.log(form.controls["username"].value);
    //form.controls["name"].value
    console.log(form.value);
    console.log(this.user);
  }
}
