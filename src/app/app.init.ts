import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { HttpHeaders } from '@angular/common/http';

export function initializer(oAuthService: OAuthService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {

                oAuthService.loginUrl = 'http://localhost:9000/identity/oauth/authorize';
                oAuthService.redirectUri = 'http://localhost:4200';
                oAuthService.clientId = 'sampleClientId';
                oAuthService.scope = 'read write foo bar';
                oAuthService.setStorage(sessionStorage);
                oAuthService.oidc = false;

                if (! oAuthService.hasValidAccessToken()) {
                    oAuthService.tryLogin({});
                    oAuthService.initImplicitFlow();
                }

                // oAuthService.configure(authConfig);
                // oAuthService.tokenValidationHandler = new JwksValidationHandler();

                // oAuthService.tryLogin({});
                // oAuthService.initImplicitFlow();

                // const headers = new HttpHeaders();
                // headers.append('Authorization', 'Basic ' + btoa('foo:foosecret'));
                // Spring
                /*await oAuthService.fetchTokenUsingPasswordFlow('foo', 'foosecret', headers)
                .then((done) => {
                    console.log('Done');
                });*/

                // Wso2 Keycloak
                /*await oAuthService.loadDiscoveryDocument()
                .then(done => {
                    console.log('Done');
                });*/

                /*await oAuthService.loadDiscoveryDocumentAndLogin().then(done => {
                  console.log('Done');
                });*/

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}
