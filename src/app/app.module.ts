import { AppService } from './app.service';
import { AppHttpInterceptor } from './app.http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { initializer } from './app.init';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, 
    /*OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['/oauthserver/*', '/oauthclient/*'],
          sendAccessToken: true
      }
  })*/
  OAuthModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [OAuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    HttpClient, AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
