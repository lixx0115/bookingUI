import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacebookService } from '../../facebook.service'
import { Subscription } from 'rxjs'
import { facebookUser } from '../../faceBookUser';
@Component({
  selector: 'app-service-provider-home',
  templateUrl: './service-provider-home.component.html',
  styleUrls: ['./service-provider-home.component.css']
})
export class ServiceProviderHomeComponent implements OnInit, OnDestroy {

  fuser: facebookUser;
  userSub: Subscription;
  isLoggedin: boolean = false;
  constructor(private facebookService: FacebookService) { }

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
  onMouseEnter(item: number) {
    this.newsFeed[item].class = this.newsFeed[item].class + " active";
  }
  onMouseout(item: number) {
    this.newsFeed[item].class = this.newsFeed[item].class.replace(" active", "");
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();

  }
}
