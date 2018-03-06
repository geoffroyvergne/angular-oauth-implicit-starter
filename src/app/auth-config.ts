import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

    // Wso2
    /*issuer: 'https://localhost:9443/oauth2/oidcdiscovery',
    redirectUri: 'http://localhost:4200',
    clientId: '7mETTt_RwUw76kksO_KWyWBkPb4a',
    requireHttps: false,
    skipIssuerCheck: true,
    strictDiscoveryDocumentValidation: false,
    scope: 'openid'*/
    
    // Keycloak
    /*issuer: 'http://127.0.0.1:8080/auth/realms/test',
    redirectUri: 'http://localhost:4200',
    clientId: 'test',
    requireHttps: false*/

    // Spring
    tokenEndpoint: '/identity/oauth/token',
    userinfoEndpoint: '/identity/auth/user',
    clientId: 'foo',
    scope: 'openid',
    requireHttps: false,
    dummyClientSecret: 'abc123',
    oidc: false
};
