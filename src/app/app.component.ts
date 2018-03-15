import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: any;

  constructor(private oauthService: OAuthService, private http: Http, private httpClient: HttpClient) {
  }

  private http404Test() {
    console.log('http404Test');
    this.http.get('qsdqsd').subscribe(
      data => {
         this.data = data;
         console.log(this.data);
    });
  }

  private httpStatusTest() {
    console.log('httpStatusTest');
    this.http.get('assets/status.json').subscribe(
      data => {
         this.data = data;
         console.log(this.data);
    });
  }

  private getToken() {
    console.log('getToken : ' + this.oauthService.getAccessToken());
    console.log('getRefreshToken : ' + this.oauthService.getRefreshToken());
    console.log('hasValidAccessToken : ' + this.oauthService.hasValidAccessToken());
    console.log('loginUrl : ' + this.oauthService.loginUrl);
    console.log('logoutUrl : ' + this.oauthService.logoutUrl);
    console.log('userinfoEndpoint : ' + this.oauthService.userinfoEndpoint);
    console.log('getIdentityClaims : ' + JSON.stringify(this.oauthService.getIdentityClaims()));

    console.log('getIdToken : ' + this.oauthService.getIdToken());
  }

  private isLogged() {
    return this.oauthService.hasValidAccessToken();
  }

  private loadSecuredTest() {
    this.httpClient.get('/resource/secured/test')
    .subscribe(
      data => {
         this.data = data;
         console.log('loadSecuredTest : ' + JSON.stringify(this.data));
    });
  }

  private loadUserProfile() {
    this.httpClient.get('/resource/users/me')
    .subscribe(
      data => {
         this.data = data;
         console.log('loadUserProfile : ' + JSON.stringify(this.data));
    });
  }

  private login() {
    this.oauthService.initImplicitFlow();
  }

  private logout() {
    this.http.get('http://localhost:9000/identity/session/logout').subscribe(
      data => {
        console.log('token revoked');
        this.oauthService.logOut();
        location.reload();
      }
    );

    // this.oauthService.logOut();
  }
}
