import {CanActivateFn, Router} from '@angular/router';
import {IdentityService} from "../../identity/services/identity.service";
import {inject} from "@angular/core";


export const authGuard: CanActivateFn = (route, state) => {
  const identityService = inject(IdentityService);
  const router = inject(Router);

  const isAuthenticated = identityService.isLoggedIn();

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['identity/login']);
    return false;
  }
};
