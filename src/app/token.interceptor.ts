import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, of, switchMap, take, throwError} from 'rxjs';
import {AuthApiService} from "./auth-api.service";
import {StorageService} from "./storage.service";
import {environment} from "./enviroment";
import {UserTokens} from "./dto/tokenDto";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authApiService: AuthApiService,
              private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes(environment.apiUrl)) {
      return next.handle(request);
    }

    const accessToken: string | null = this.storageService.getAccessToken();
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(() => err);
      }
    }));
  }

  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<string | null>(null);

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authApiService.refreshTokens().pipe(
        switchMap((tokens: UserTokens) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens.access);

          return next.handle(this.addToken(request, tokens.access));
        }),
        catchError(err => {
          this.authApiService.logout();
          return throwError(() => err);
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(accessToken => accessToken != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(request, accessToken))
        })
      )
    }
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
