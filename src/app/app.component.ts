import { AppService } from './app.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { Environments } from './environments';
import { config } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  environmentName = environment.name;
  title = 'app';
  data: any;

  constructor(private appService: AppService) {

  }

  getUserInfo() {
    console.log('getUserInfo');
    console.log('getUserInfo' +
    JSON.stringify(this.appService.jwtHelper().decodeToken(this.appService.getOauthService().getAccessToken())));
  }

  private http404Test() {
    console.log('http404Test');
    this.appService.http404Test().subscribe(
      data => {
         this.data = data;
         console.log(this.data);
    });
  }

  private httpStatusTest() {
    console.log('httpStatusTest');
    this.appService.httpStatusTest().subscribe(
      data => {
         this.data = data;
         console.log(this.data);
    });
  }

  private getToken() {
    console.log('getToken : ' + this.appService.getOauthService().getAccessToken());
    console.log('getRefreshToken : ' + this.appService.getOauthService().getRefreshToken());
    console.log('hasValidAccessToken : ' + this.appService.getOauthService().hasValidAccessToken());
    console.log('loginUrl : ' + this.appService.getOauthService().loginUrl);
    console.log('logoutUrl : ' + this.appService.getOauthService().logoutUrl);
    console.log('userinfoEndpoint : ' + this.appService.getOauthService().userinfoEndpoint);
    console.log('getIdentityClaims : ' + JSON.stringify(this.appService.getOauthService().getIdentityClaims()));

    console.log('getIdToken : ' + this.appService.getOauthService().getIdToken());
  }

  private isLogged() {
    return this.appService.isLogged();
  }

  private loadSecuredTest() {
    this.appService.loadSecuredTest()
    .subscribe(
      data => {
         this.data = data;
         console.log('loadSecuredTest : ' + JSON.stringify(this.data));
    });
  }

  private loadUserProfile() {
    this.appService.loadUserProfile()
    .subscribe(
      data => {
         this.data = data;
         console.log('loadUserProfile : ' + JSON.stringify(this.data));
    });
  }

  private login() {
    this.appService.login();
  }

  private logout() {
    this.appService.logout();
  }

  private getAccountUrl() {
    window.location.href = environment.accountUrl;
  }
}
