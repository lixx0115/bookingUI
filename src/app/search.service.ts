import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  searchResult = [
    { name: "Ms Jone music school", id: "1" },
    { name: "Ms Smith music school", id: "1" },
    { name: "Ms Rock dance school", id: "1" },
    { name: "Ms Stone art school", id: "1" },
    { name: "Ms Allen music school", id: "1" },
  ]
  public searchProvider(searchTeam: string) {
    return new Promise((filfull, reject) => filfull(this.searchResult));
  }



}
