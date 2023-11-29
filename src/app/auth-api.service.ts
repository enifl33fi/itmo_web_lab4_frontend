import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {AuthenticationService} from "./authentication.service";
import {MapperService} from "./mapper.service";
import {UserForm} from "./dto/userDto";
import {UserTokens} from "./dto/tokenDto";
import {Router} from "@angular/router";
import {Observable, Subject, tap, throwError} from "rxjs";
import {LoadingService} from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private storageService: StorageService,
              private authenticationService: AuthenticationService,
              private mapperService: MapperService,
              private router: Router,
              private loadingService: LoadingService) {

  }

  authorize(
    user: UserForm,
    authObservable: Observable<UserTokens | null>,
    loadingSubj?: Subject<boolean>
  ) {
    this.storageService.setDeepSave(user.isToSave);
    authObservable.pipe(
      this.loadingService.handleLoading(loadingSubj)
    ).subscribe((data: UserTokens|null) => {
      if (data) {
        this.storageService.storeTokens(data);
        this.router.navigate(["/main"]);
      }
    })
  }


  registerUser(user: UserForm, loadingSubj?: Subject<boolean>): void {
    this.authorize(
      user,
      this.authenticationService.register(this.mapperService.mapUserFormToRegistration(user)),
      loadingSubj
    );
  }

  loginUser(user: UserForm, loadingSubj?: Subject<boolean>): void {
    this.authorize(
      user,
      this.authenticationService.login(this.mapperService.mapUserFormToLogin(user)),
      loadingSubj
    );
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
