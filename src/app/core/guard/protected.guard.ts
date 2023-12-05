import {CanActivateFn, Router} from '@angular/router';
import {AuthApiService} from "../service/server/auth/auth-api.service";
import {inject} from "@angular/core";

export const protectedGuard: CanActivateFn = (route, state) => {
  const authApiService: AuthApiService = inject(AuthApiService);
  const router: Router = inject(Router);
  if (!authApiService.isLogged()) {
    router.navigate(['/'])
    return false;
  }
  return true;
};
