import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse , HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private oauthService: OAuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        const token: string = this.oauthService.getAccessToken();

        /*if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }*/

        /*const header = 'Bearer ' + token;
        const headers = req.headers.set('Authorization', header);
        req = req.clone({ headers });
        console.log('req : ' + JSON.stringify(req));*/

        // return next.handle(req);

        return next.handle(req)
            .do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event: ' + JSON.stringify(event));
                }
            })
            .catch(error => {
                console.log('Caught error', error);

                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        console.log('error 401');

                        const header = 'Bearer ' + token;
                        const headers = req.headers.set('Authorization', header);

                        req = req.clone({ headers });

                        console.log('req : ' + JSON.stringify(req));
                        return next.handle(req);
                    }

                    if (error.status === 404) {
                        console.log('error 404');
                    }

                    if (error.status === 400) {
                        console.log('error 400');
                    }
                  }

                return Observable.throw(error);
            });
    }
}
