import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FacebookService } from '../facebook.service';
@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {

  constructor(private facebook: FacebookService, private router: Router) { }

  ngOnInit() {
    this.router.navigate(['serviceprovider', 'home']);
  }

}
