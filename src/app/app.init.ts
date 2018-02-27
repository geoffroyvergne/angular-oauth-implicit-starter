import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';

export function initializer(oAuthService: OAuthService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                oAuthService.configure(authConfig);
                oAuthService.tokenValidationHandler = new JwksValidationHandler();

                // Spring
                await oAuthService.fetchTokenUsingPasswordFlow('user', 'user').then((done) => {
                    console.log('Done');
                    // Loading data about the user
                    // return oAuthService.loadUserProfile();
                });

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
