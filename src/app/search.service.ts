import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from './user';

@Injectable()
export class SearchService {

  constructor(private fireBase: FirebaseService) { }

  searchResult = [
    { name: "Ms Jone music school", id: "1" },
    { name: "Ms Smith music school", id: "2" },
    { name: "Ms Rock dance school", id: "3" },
    { name: "Ms Stone art school", id: "4" },
    { name: "Ms Allen music school", id: "5" },
  ]
  public searchProvider(searchTeam: string) {
    // return new Promise((filfull, reject) => filfull(this.searchResult));
    return this.fireBase.getData(['userProfile']).then((data) => {
      let result = new Array<User>();
      let idlist = Object.keys(data);
      for (let id of idlist) {
        if (data[id].isProvider) {
          result.push(data[id]);
        }
      }
      return result;
    })
  }



}
