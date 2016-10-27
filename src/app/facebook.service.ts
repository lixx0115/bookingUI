import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { User } from './user';
import { environment } from '../environments/environment'
import { FirebaseService } from './firebase.service';
declare const FB: any;
@Injectable()
export class FacebookService implements OnInit {

  currentUser: User;
  faceUserEmitter = new EventEmitter<User>();
  constructor(private firbase: FirebaseService) {
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
        this.fetchFacebookUser().then((d: User) => this.setCurrentAndEmitEvent(d));
      } else if (response.status === 'not_authorized') {

      } else {
      }
    });
  }



  public facebookLogin(): Promise<boolean> {
    return new Promise(
      (filfill, reject) => {
        FB.login((response) => {
          if (response.authResponse) {
            this.fetchFacebookUser().then((d: User) => this.setCurrentAndEmitEvent(d));
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
          this.fetchFacebookUser().then(() => filfill(true))
        }
        else {
          filfill(false);
        }
      });
    });
  }

  public SaveUserProfile(user: User) {
    this.currentUser = user;
    return this.firbase.putData(["userProfile", user.userid], user);
  }

  private GetUserProfile(userId: string) {

    return this.firbase.getData(["userProfile", userId]).then(
      (data: User) => {
        console.log("in get user profile")
        if (data !== null) {
          return data;
        }
        else {
          return null;
        }
      }
    );
  }

  private setCurrentAndEmitEvent(curentUser: User) {
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

  public fetchFacebookUser(): Promise<User> {
    var user = new User();
    if (this.currentUser) {
      return new Promise((filfill, reject) => { filfill(this.currentUser) });
    }
    else {
      return new Promise((filfill, reject) => {
        this.fetchUserinfomation().then((data: any) => {
          user.userid = data.id;
          user.userName = data.name;

        }).then(() => { return this.fetchUserPicture(); }
          ).then((url) => { user.profileImageUrl = url; return this.GetUserProfile(user.userid) }
          ).then((profile) => {
            console.log("in profile", profile)
            if (profile != null) {
              user.isConsumer = profile.isConsumer;
              user.isProvider = profile.isProvider;
              user.cellNumber = profile.cellNumber;
              user.email = profile.email;
              user.provider = profile.provider;
            }
            this.setCurrentAndEmitEvent(user);
            filfill(this.currentUser)
          }
          )
      })
    }
  }


}
