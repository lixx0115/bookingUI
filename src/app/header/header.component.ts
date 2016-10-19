import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacebookService } from '../facebook.service'
import { Subscription } from 'rxjs'
import { facebookUser } from '../faceBookUser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  facebookUserSub: Subscription;
  fuser: facebookUser;

  userLoggedIn: Promise<boolean>;
  constructor(private facebookService: FacebookService, private router: Router) { }

  ngOnDestroy() {
    this.facebookUserSub.unsubscribe();
  }

  ngOnInit() {
    this.userLoggedIn = this.facebookService.checkStatus();

    this.userLoggedIn.then(loggedon => { if (loggedon) this.facebookService.fetchFacebookUser().then(user => this.fuser = user) }
    )

    this.facebookUserSub = this.facebookService.faceUserEmitter.subscribe(
      (fuser: facebookUser) => {
        this.userLoggedIn = this.facebookService.checkStatus();
        this.fuser = fuser;
      }
    )
  }

  onLogout() {
    this.facebookService.facebookLogout().then((done) => this.router.navigate([""]));
  }

}
