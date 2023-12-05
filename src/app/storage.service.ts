import {Injectable} from '@angular/core';
import {UserTokens} from "./dto/tokenDto";

@Injectable({
  providedIn: 'root'
})
export class StorageService{
  private deepSave: boolean = false;
  private readonly ACCESS_TOKEN: string = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';

  onInit() {
    if (this.getLocalRefreshToken()){
      this.deepSave = true;
    }
  }

  constructor() { }

  setDeepSave(isDeepSave: boolean): void {
    this.deepSave = isDeepSave;
  }

  getAccessToken(): string|null {
    return sessionStorage.getItem(this.ACCESS_TOKEN);
  }
  getRefreshToken(): string|null {
    if (this.deepSave) {
      return this.getLocalRefreshToken();
    } else {
      return this.getSessionRefreshToken();
    }
  }

  saveRefreshToken(refreshToken: string): void {
    if (this.deepSave) {
      this.saveLocalRefreshToken(refreshToken);
    } else {
      this.saveSessionRefreshToken(refreshToken);
    }
  }

  storeTokens(tokens: UserTokens): void {
    sessionStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    this.saveRefreshToken(tokens.refreshToken);
  }

  removeAccessToken(): void {
    sessionStorage.removeItem(this.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    if (this.deepSave) {
      this.removeLocalRefreshToken();
    } else {
      this.setDeepSave(false);      //спорно, нужно проверить
      this.removeSessionRefreshToken();
    }
  }

  removeTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }



  private removeLocalRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private removeSessionRefreshToken(): void {
    sessionStorage.removeItem(this.REFRESH_TOKEN);
  }
  private getLocalRefreshToken(): string|null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private getSessionRefreshToken(): string|null {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  private saveLocalRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private saveSessionRefreshToken(refreshToken: string): void {
    sessionStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }
}
