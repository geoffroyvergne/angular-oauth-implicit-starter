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

  constructor(private oauthService: OAuthService) {
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
  }

  private loadUserProfile() {
    this.oauthService.loadUserProfile().then(userProfile => {
      console.log('loadUserProfile : ' + JSON.stringify(userProfile));
    });
  }

  private logout() {
    this.oauthService.logOut();
  }
}
