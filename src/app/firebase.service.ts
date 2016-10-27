import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs/Rx"
@Injectable()
export class FirebaseService {

  constructor(private http: Http) { }

  public generateKeyFromDate(input: Date) {

    var curr_date = input.getDate();
    var curr_month = input.getMonth() + 1; //Months are zero based
    var curr_year = input.getFullYear();
    return curr_year + "-" + curr_month + "-" + curr_date;
  }


  public getData(keys: string[]) {
    var path = this.covertKeysToPath(keys);
    console.log(this.http)
    return this.http.get('https://angular2-learn-12384.firebaseio.com' + path + '.json').toPromise().then(data => {
      let result = null
      try {

        result = data.json();
      }
      catch (err) {

      }
      console.log("done")
      return result;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  public putData(keys: string[], data: any) {
    var path = this.covertKeysToPath(keys);
    return this.http.put('https://angular2-learn-12384.firebaseio.com' + path + '.json', JSON.stringify(data)).toPromise().catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  public postData(keys: string[], data: any) {
    var path = this.covertKeysToPath(keys);
    return this.http.post('https://angular2-learn-12384.firebaseio.com' + path + '.json', JSON.stringify(data)).toPromise().catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  private covertKeysToPath(keys: string[]): string {
    var result = '';
    for (let key of keys) {
      result = result + '/' + key;
    }
    return result;
  }
}
