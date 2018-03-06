import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
// import * as decode from 'angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: any;

  constructor(private oauthService: OAuthService, private http: HttpClient) {
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

    // const jwtHelper = new JwtHelper();
    // console.log(JSON.parse(jwtHelper.decodeToken(this.oauthService.getAccessToken())));

    console.log('getIdToken : ' + this.oauthService.getIdToken());
  }

  private loadSecuredTest() {
    /*this.http.get('/oauthclient/secured/test').subscribe(response => {
      console.log('loadSecuredTest : ' + response);
    });*/

    this.http.get('/oauthclient/secured/test',
    {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.oauthService.getAccessToken() } )
    })
    // this.http.get('/oauthclient/secured/test')
    .subscribe(
      data => {
         this.data = data;
         console.log('loadSecuredTest : ' + JSON.stringify(this.data));
    });
  }

  private loadUserProfile() {
    this.oauthService.loadUserProfile().then(userProfile => {
      console.log('loadUserProfile : ' + JSON.stringify(userProfile));
    });

    /*this.http.get('/oauthserver/auth/user',
    {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.oauthService.getAccessToken() } )
    })
    .subscribe(
      data => {
         this.data = data;
         console.log('loadUserProfile : ' + JSON.stringify(this.data));
    });*/
  }

  private login() {
    this.oauthService.initImplicitFlow();
  }

  private logout() {
    console.log('logout');
    this.oauthService.logOut();
    window.location.href = 'http://localhost:4200';
  }
}
