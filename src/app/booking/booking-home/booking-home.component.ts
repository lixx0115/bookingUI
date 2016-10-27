import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacebookService } from '../../facebook.service'
import { Subscription } from 'rxjs'
import { User } from '../../user';
@Component({
  selector: 'app-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.css']
})
export class BookingHomeComponent implements OnInit, OnDestroy {

  fuser: User;
  userSub: Subscription;
  isLoggedin: boolean = false;
  constructor(private facebookService: FacebookService) { }



  onMouseEnter(item: number) {
    this.newsFeed[item].class = this.newsFeed[item].class + " active";
  }
  onMouseout(item: number) {
    this.newsFeed[item].class = this.newsFeed[item].class.replace(" active", "");
  }
  newfeedClass: string = "list-group-item list-group-item-success";
  newfeedClassActive: string = "list-group-item list-group-item-success active";

  newfeedClassCanceled: string = "list-group-item list-group-item-danger";

  newsFeed: { message: string, type: string, class: string }[] = [
    { message: "1 pm piano class", type: "accepted", class: this.newfeedClass },

    { message: "2 pm ballet class", type: "accepted", class: this.newfeedClass },

    { message: "3 pm viola class", type: "accepted", class: this.newfeedClass },

    { message: "4 pm Clavinet class", type: "accepted", class: this.newfeedClass },

    { message: "3 pm piano class", type: "canceled", class: this.newfeedClassCanceled }

  ]

  ngOnInit() {
    this.facebookService.checkStatus().then(isloggedin => {
      this.isLoggedin = isloggedin
      if (this.isLoggedin) {
        this.facebookService.fetchFacebookUser().then(fuser => this.fuser = fuser);
      }
    }

    );

    this.userSub = this.facebookService.faceUserEmitter.subscribe(
      (fuser) => {
        this.fuser = fuser;
        if (this.fuser) {
          this.isLoggedin = true;
        }
        else {
          this.isLoggedin = false;
        }
      }
    )

  }
  ngOnDestroy() {
    this.userSub.unsubscribe();

  }
}
