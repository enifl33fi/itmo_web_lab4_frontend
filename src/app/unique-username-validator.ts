import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {AuthenticationService} from "./authentication.service";
import {debounceTime, distinctUntilChanged, first, map, Observable, switchMap, timer} from "rxjs";

@Injectable({providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator{
  constructor(private authenticationService: AuthenticationService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(500).pipe(
      switchMap(() => this.authenticationService.checkUnique(control.value)),
      map((isUnique) =>
        isUnique ? null : {uniqueUsername: true}
      ),
      first())
  }
}
