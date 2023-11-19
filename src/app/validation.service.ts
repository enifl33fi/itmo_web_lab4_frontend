import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private usernameRegExp: RegExp = /^[\w]{1,25}$/
  constructor() { }

  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowed: boolean = this.usernameRegExp.test(control.value);
      return allowed
        ? null
        : { invalidUsername: { value: control.value } };
    };
  }
}
