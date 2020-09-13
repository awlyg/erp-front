import {Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';
import {LocalStorageHelper} from '../../../../helpers/local-storage.helper';
import { AuthService } from '../../auth.service';

declare const gapi: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  username: string;
  password: string;
  public auth2: any;


  constructor(private auth: AuthService,
              private router: Router,
              private toasterService: ToastrService,
              public jwtHelper: JwtHelperService
  ) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }


  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '814637056390-tvjbna9ss2aa8lr3bo8nil2j6jpkdcn4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
   public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();

        let email = profile.getEmail();
        if (email) {
          this.auth.checkLoginEmail(email).subscribe(
            result => {
              if (result && result.uid) {

                LocalStorageHelper.setItem('token', result.token);
                LocalStorageHelper.initialiseFilters();
                location.reload();
              } else {
                this.toasterService.error('Please try again...', 'Google login error');
              }
            });

        }

      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }

  checkLogin() {
    this.auth.checkCredentials(this.username, this.password).subscribe(
      result => {
        if (result && result.uid) {
          LocalStorageHelper.setItem('token', result.token);
          LocalStorageHelper.initialiseFilters();
          location.reload();
        } else {
          this.toasterService.error('Please try again...', 'Credentials error');
        }
      }
    );
  }

  ngOnDestroy(): void {
  }
}
