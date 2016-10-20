import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { facebookUser } from './facebookUser';
import { environment } from '../environments/environment'
declare const FB: any;
@Injectable()
export class FacebookService implements OnInit {

  currentUser: facebookUser;
  faceUserEmitter = new EventEmitter<facebookUser>();
  constructor() {
    FB.init({
      appId: environment.facebookAppId,
      cookie: true,  // enable cookies to allow the server to access
      // the session 
      xfbml: true,  // parse social plugins on this page
      version: 'v2.5' // use graph api version 2.5
    });
  }


  ngOnInit() {
    FB.getLoginStatus(response => {
      console.log(response)
      if (response.status === 'connected') {
        this.fetchFacebookUser().then((d: facebookUser) => this.setCurrentAndEmitEvent(d));
      } else if (response.status === 'not_authorized') {

      } else {
      }
    });
  }

  public fetchFacebookUser(): Promise<facebookUser> {
    var user = new facebookUser();
    if (this.currentUser) {
      return new Promise((filfill, reject) => { filfill(this.currentUser) });
    }
    else {
      return new Promise((filfill, reject) => {
        this.fetchUserinfomation().then((data: any) => {
          user.userid = data.id;
          user.userName = data.name;
          this.fetchUserPicture().then((pic) => user.profileImageUrl = pic).then(() => {
            this.currentUser = user;
            filfill(user);
          }

          )
        }
        )
      }
      )
    }
  }

  public facebookLogin(): Promise<boolean> {
    return new Promise(
      (filfill, reject) => {
        FB.login((response) => {
          if (response.authResponse) {
            this.fetchFacebookUser().then((d: facebookUser) => this.setCurrentAndEmitEvent(d));
            filfill(true)
          }
          else {
            filfill(false)
          }
        }
          , { scope: 'public_profile' });
      }
    )

  }

  public facebookLogout(): Promise<boolean> {
    return new Promise(
      (filfill, reject) =>
        FB.logout(
          response => {
            this.setCurrentAndEmitEvent(null);
            filfill(true);
          })
    )
  }


  public checkStatus(): Promise<boolean> {

    return new Promise((filfill, reject) => {
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          filfill(true);
        }
        else {
          filfill(false);
        }
      });
    });
  }

  private setCurrentAndEmitEvent(curentUser: facebookUser) {
    this.currentUser = curentUser;
    this.faceUserEmitter.emit(this.currentUser);

  }

  private fetchUserinfomation() {
    var user = {
      name: "", id: "", profileImagePath: ""
    }
    return new Promise((filfill, reject) => {
      FB.api('/me', (response) => {
        console.log(response)
        user.name = response.name
        user.id = response.id
        filfill(user)
      })

    }
    );
  }

  private fetchUserPicture(): Promise<string> {
    return new Promise((filfill, reject) => {
      FB.api("/me/picture", (response) => {
        console.log(response)
        filfill(response.data.url);
      });
    }
    );
  }



}
