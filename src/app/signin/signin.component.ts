import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  serverResp: {};
  values: string[] = ['milk', 'bread', 'bean'];
  userlist: Promise<[{ user: string, email: string }]>;
  asynvalue: Promise<Response>;
  constructor(private fservice: FirebaseService) {
    this.fservice.getDate().subscribe(
      (data: any) => {
        console.log(data)
        this.serverResp = data
      }
    );
    this.asynvalue = this.fservice.getDatePromise().then((r: Response) => r.json());

    this.userlist = this.fservice.GetUserData();
  }

  ngOnInit() {
  }

  onAdd(name: string, email: string) {
    this.fservice.sendData(name, email).then((r: Response) => console.log(r));
  }
}
