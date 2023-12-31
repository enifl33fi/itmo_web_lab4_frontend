import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../../utils/validation/validation.service";
import {UserForm} from "../../../dto/userDto";
import {AuthApiService} from "../../../../core/service/server/auth/auth-api.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Input("username") givenUsername?: string;

  loading$ = new BehaviorSubject<boolean>(false)

  signInForm: FormGroup = new FormGroup({
    username: new FormControl<string>('',
      [Validators.required,
      Validators.maxLength(25),
      this.validationService.usernameValidator()]),
    password: new FormControl<string>('',
      [Validators.required]),
    isToSave: new FormControl<boolean>(true)
  })

  constructor(private validationService: ValidationService,
              private authApiService: AuthApiService) {
  }

  get username() {
    return this.signInForm.get('username');
  }

  get password() {
    return this.signInForm.get('password');
  }

  ngOnInit(): void {
    if (this.givenUsername !== undefined) {
      this.username?.setValue(this.givenUsername);
      this.username?.markAsDirty({onlySelf: true})
    }
  }

  onSubmit(): void {
    const givenUser: UserForm = this.signInForm.value as UserForm;
    this.authApiService.loginUser(givenUser, this.loading$);
  }
}
