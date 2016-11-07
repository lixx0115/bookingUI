import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    username: "what is a name",
    email: "",
    password: "",
    gender: ""
  };
  genders = ['male', 'female'];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSumbit(form: NgForm) {
    // console.log(form.controls["username"].value);
    //form.controls["name"].value
    console.log(form.value);
    console.log(this.user);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
