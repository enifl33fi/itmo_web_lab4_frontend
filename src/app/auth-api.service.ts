import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {AuthenticationService} from "./authentication.service";
import {MapperService} from "./mapper.service";
import {UserForm} from "./dto/userDto";
import {UserTokens} from "./dto/tokenDto";
import {Router} from "@angular/router";
import {Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private storageService: StorageService,
              private authenticationService: AuthenticationService,
              private mapperService: MapperService,
              private router: Router) {

  }

  loginUser(user: UserForm): void {
    this.storageService.setDeepSave(user.isToSave);
    this.authenticationService.login(this.mapperService.mapUserFormToLogin(user)).subscribe(
        (data: UserTokens|null) => {
          if (data) {
            this.storageService.storeTokens(data);
            this.router.navigate(["/main"]);
          }
        });
  }

  refreshTokens(): Observable<UserTokens> {
    const token: string|null = this.storageService.getRefreshToken();
    this.storageService.removeTokens();
    if (token) {
      return this.authenticationService.refresh({refreshToken: token}).pipe(
        tap({
          next: data => {
            this.storageService.storeTokens(data);
          }})
      )
    } else {
      return throwError(() => "Invalid token")
    }
  }

  isLogged(): boolean {
    return !!this.storageService.getRefreshToken();
  }

  logout(): void {
    this.storageService.removeTokens();
    this.router.navigate(["/"])
  }

}
