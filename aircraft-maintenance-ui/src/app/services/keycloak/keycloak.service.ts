import {Injectable} from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "./user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9098',
        realm: 'aircraft-maintenance',
        clientId: 'aircraft-client'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  getRoles(): string[] {
    return this.keycloak.realmAccess?.roles || [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  constructor() {
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required'
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
    }
  }

  login(){
    return this.keycloak.login();
  }

  logout(){
    return this.keycloak.logout({redirectUri: 'http:localhost:4200'})
  }
}
