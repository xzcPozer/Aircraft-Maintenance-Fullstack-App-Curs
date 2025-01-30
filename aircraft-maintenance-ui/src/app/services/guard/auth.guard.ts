import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "../keycloak/keycloak.service";

export const authGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  const requiredRole = route.data['role'] as string[];

  if(keycloakService.keycloak.isTokenExpired()){
    router.navigate(['login']);
    return false;
  }
  return keycloakService.hasAnyRole(requiredRole);
};
