import {Injectable} from '@angular/core';
import {UserLogin, UserRegistration, UserUnique} from "./dto/userDto";
import {RefreshToken, UserTokens} from "./dto/tokenDto";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "./enviroment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AlertApiService} from "./alert-api.service";


const AUTH_URL: string = `${environment.apiUrl}/auth`
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,
              private alertApiService: AlertApiService) {
  }

  register(userToRegister: UserRegistration): Observable<UserTokens | null> {
    return this.http.post<UserTokens | null>(`${AUTH_URL}/register`,
      userToRegister,
      httpOptions).pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError(err);
          return of(null)
        })
    )
  }

  login(userToLogin: UserLogin): Observable<UserTokens | null> {
    return this.http.post<UserTokens | null>(`${AUTH_URL}/login`,
      userToLogin,
      httpOptions).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return of(null)
      })
    )
  }

  refresh(req: RefreshToken): Observable<UserTokens> {
    return this.http.post<UserTokens>(`${AUTH_URL}/refresh`,
      req,
      httpOptions)
  }

  checkUnique(username: string): Observable<boolean> {
    return this.http.get<UserUnique>(`${AUTH_URL}/unique`,
      {
        params: {
          username: username
        }
      }).pipe(
      map(data => data.unique),
      catchError(err => {
        this.handleError(err);
        return of(true)
      })
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status == 0) {
      this.handleConnectionError();
    } else {
      this.alertApiService.showError(error.statusText, error.message);
    }
  }

  private handleConnectionError() {
    this.alertApiService.showError("Connection error", "Can't connect with server");
  }
}
