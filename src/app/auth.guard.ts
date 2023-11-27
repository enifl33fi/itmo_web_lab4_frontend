import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthApiService} from "./auth-api.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authApiService: AuthApiService = inject(AuthApiService);
  const router: Router = inject(Router);
  if (authApiService.isLogged()) {
    router.navigate(['/main'])
    return false;
  }
  return true;
};
