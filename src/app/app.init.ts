import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { HttpHeaders } from '@angular/common/http';

export function initializer(oAuthService: OAuthService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                oAuthService.setStorage(sessionStorage);
                oAuthService.configure(authConfig);
                oAuthService.tokenValidationHandler = new JwksValidationHandler();

                // Spring
                if (! oAuthService.hasValidAccessToken()) {
                    await oAuthService.tryLogin()
                    .then(done => {
                        console.log('Done');
                        oAuthService.initImplicitFlow();
                    });
                    // await oAuthService.initImplicitFlow();
                }

                document.location.hash = '';

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
