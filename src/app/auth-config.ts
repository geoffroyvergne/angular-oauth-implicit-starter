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
    /*issuer: 'http://localhost:8080/auth/realms/test',
    redirectUri: 'http://localhost:4200',
    clientId: 'test',
    requireHttps: false,
    logoutUrl: 'http://localhost:8080/auth/realms/test/protocol/openid-connect/logout?redirect_uri=http%3A%2F%2Flocalhost%3A4200'*/

    // Spring
    loginUrl: 'http://localhost:9000/identity/oauth/authorize',
    redirectUri: 'http://localhost:4200',
    clientId: 'implicittest',
    scope: 'openid read write foo bar',
    oidc: false,
    // logoutUrl: 'http://localhost:9000/identity/session/logout?redirect_uri=http%3A%2F%2Flocalhost%3A4200'
};
