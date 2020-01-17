import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router){

  }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      // this.router.navigate(['login']);
      window.location.replace('login');

      return false;
    }
    return true;
  }
}