import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs/Rx"
@Injectable()
export class FirebaseService {

  constructor(private http: Http) { }

  public getDate() {
    return this.http.get('https://angular2-learn-12384.firebaseio.com/title.json').map(
      (respone: Response) => {
        respone.json();
        console.log(respone)
      }
    );
  }
  public getDatePromise() {
    return this.http.get('https://angular2-learn-12384.firebaseio.com/title.json').toPromise()
      .catch(err => {
        console.error(JSON.stringify(err));
      });
  }
  public GetUserData() {
    return this.http.get('https://angular2-learn-12384.firebaseio.com/users.json').toPromise().then(data => {
      var ta = []
      var userList = data.json()
      for (let key in userList) {
        console.log(userList[key]);
        ta.push({ name: userList[key].user, email: userList[key].email });
      }
      return ta;
    }

    ).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  public sendData(user: string, email: string) {
    return this.http.post('https://angular2-learn-12384.firebaseio.com/users.json?access_token', JSON.stringify({ user, email })).toPromise().catch(err => {
      console.error(JSON.stringify(err));
    });
  }
}
