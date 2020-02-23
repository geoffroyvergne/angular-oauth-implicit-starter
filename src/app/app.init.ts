import { OAuthService } from 'angular-oauth2-oidc';
import { authConfigSpring, authConfigKeycloak, authConfigWso2, authConfigAuth0 } from './app.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Environments } from './environments';

export function initializer(oAuthService: OAuthService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('environment : ' + environment.name);

                oAuthService.setStorage(sessionStorage);
                oAuthService.tokenValidationHandler = new JwksValidationHandler();

                // Spring
                if (environment.name === Environments.SPRING) {
                    oAuthService.configure(authConfigSpring);
                    if (! oAuthService.hasValidAccessToken()) {
                        await oAuthService.tryLogin()
                        .then(done => {
                            console.log('Done');
                            oAuthService.initImplicitFlow();
                        });
                    }

                    document.location.hash = '';
                }

                // Wso2 Keycloak
                if (environment.name === Environments.KEYCLOAK || environment.name === Environments.WSO2  || environment.name === Environments.AUTH0) {

                    if (environment.name === Environments.KEYCLOAK) {
                        oAuthService.configure(authConfigKeycloak);
                    }

                    if (environment.name === Environments.WSO2) {
                        oAuthService.configure(authConfigWso2);
                    }

                    if (environment.name === Environments.AUTH0) {
                        oAuthService.configure(authConfigAuth0);
                    }

                    /*await oAuthService.loadDiscoveryDocument()
                    .then(done => {
                        console.log('Done');
                    });*/

                    await oAuthService.loadDiscoveryDocumentAndLogin().then(done => {
                      console.log('Done');
                    });
                }

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}
