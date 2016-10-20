import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core';
import { FacebookService } from './facebook.service'
@Injectable()
export class LogginGuard implements CanActivate {
    constructor(private facebook: FacebookService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.facebook.currentUser) {
            return true;
        }
        else {
            return false;
        }

    }
}