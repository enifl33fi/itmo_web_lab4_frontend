import { Injectable } from '@angular/core';
import {UserForm, UserLogin, UserRegistration} from "./dto/userDto";

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  mapUserFormToRegistration(user: UserForm): UserRegistration {
    return {
      username: user.username,
      password: user.password
    }
  }

  mapUserFormToLogin(user: UserForm): UserLogin {
    return {
      username: user.username,
      password: user.password
    }
  }
}
