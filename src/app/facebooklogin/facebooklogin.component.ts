import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from "../facebook.service";
declare const FB: any;
@Component({
  selector: 'app-facebooklogin',
  templateUrl: './facebooklogin.component.html',
  styleUrls: ['./facebooklogin.component.css']
})

export class FacebookloginComponent implements OnInit {

  constructor(private facebookService: FacebookService, private router: Router) {

  }


  onFacebookLoginClick() {
    this.facebookService.facebookLogin().then(loggin => {
      console.log(loggin);
      if (loggin) {
        this.router.navigate(["/booking"]);
        console.log("booking");
      }
      else {
        this.router.navigate(['/signin']);
        console.log("signin");
      }
    });


  }

  ngOnInit() {

  }
}
