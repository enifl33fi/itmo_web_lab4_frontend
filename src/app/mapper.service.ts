import {Injectable} from '@angular/core';
import {UserForm, UserLogin, UserRegistration} from "./dto/userDto";
import {FormArray} from "@angular/forms";
import {coords} from "./coords";
import {CheckForm, CheckRequest} from "./dto/resultDto";

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

  mapXBoolToValue(x: boolean[]): number {
    return this.mapBoolToValue(x, coords.x);
  }
  mapRBoolToValue(r: boolean[]): number {
    return this.mapBoolToValue(r, coords.r);
  }

  mapBoolToValue(arr: boolean[], valArr: string[]): number {
    return arr.map((value, i) => value ? valArr[i] : null)
      .filter(value => value !== null)
      .map(value => +value!)[0];
  }

  mapRArrayToValue(r: FormArray): number|null {
    return this.mapArrayToValue(r, coords.r);
  }
  mapArrayToValue(arr: FormArray, valArr: string[]): number|null {
    if (arr.valid) {
      return this.mapBoolToValue(arr.controls.map(control => control.value), valArr);
    }
    return null;
  }

  mapCheckFromToCheckRequest(check: CheckForm): CheckRequest {
    return {
      x: String(this.mapXBoolToValue(check.x)),
      y: check.y,
      r: String(this.mapRBoolToValue(check.r))
    }
  }
}
