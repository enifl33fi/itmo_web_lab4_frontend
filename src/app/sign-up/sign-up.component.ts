import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidationService} from "../validation.service";
import {UserForm, UserRegistration} from "../dto/userDto";
import {StorageService} from "../storage.service";
import {AuthenticationService} from "../authentication.service";
import {MapperService} from "../mapper.service";
import {UniqueUsernameValidator} from "../unique-username-validator";
import {AuthApiService} from "../auth-api.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Input("username") givenUsername?: string;

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl<string>('',
      {
        validators: [Validators.required,
        Validators.maxLength(25),
        this.validationService.usernameValidator()],
        asyncValidators: [
          this.usernameValidator.validate.bind(this.usernameValidator)
        ]
      }),
    password: new FormControl<string>('',
      [Validators.required]),
    isToSave: new FormControl<boolean>(true)
  })

  constructor(private validationService: ValidationService,
              private usernameValidator: UniqueUsernameValidator,
              private authApiService: AuthApiService) {
  }

  ngOnInit(): void {
    if (this.givenUsername !== undefined) {
      this.username?.setValue(this.givenUsername);
      this.username?.markAsDirty({onlySelf: true})
    }
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  onSubmit(): void {
    const givenUser: UserForm = this.signUpForm.value as UserForm;
    this.authApiService.registerUser(givenUser);
  }

}
