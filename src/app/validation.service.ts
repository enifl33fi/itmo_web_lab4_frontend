import { Injectable } from '@angular/core';
import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from "@angular/forms";
import {coords} from "./coords";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private usernameRegExp: RegExp = /^\w{1,25}$/
  private yRegExp: RegExp = /^-?\d+([.,]\d{1,3})?$/
  constructor() { }

  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowed: boolean = this.usernameRegExp.test(control.value);
      return allowed
        ? null
        : { invalidUsername: { value: control.value } };
    };
  }

  yFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowed: boolean = this.yRegExp.test(control.value);
      return allowed
        ? null
        : { invalidFormatY: { value: control.value } };
    };
  }

  yValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let val:number = +this.commaHandle(control.value);
      const allowed: boolean = val >= -3 && val <= 3;
      return allowed
        ? null
        : { invalidValueY: { value: control.value } };
    };
  }

  commaHandle(value: string): string {
    return value.replace(',', '.');
  }
  arrLengthValidator(count = 1): ValidatorFn {
    return (formArray: AbstractControl) => {
      const totalSelected = (formArray as FormArray).controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected === count ? null: {invalidCount: { value: totalSelected}};
    }
  }

  rPositiveValidator(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const notPositiveCount = (formArray as FormArray).controls
        .map((control, i) => control.value ? coords.r[i]: null)
        .filter(value => value !== null && +value <= 0)
        .length;
      return notPositiveCount === 0 ? null: {invalidNegative: { value: notPositiveCount}};
    }
  }

  isValidY(y: string): boolean {
    return +y >= -3 && +y <= 3;
  }

  isValidX(x: string): boolean {
    return +x >= -3 && +x <= 5;
  }
}
