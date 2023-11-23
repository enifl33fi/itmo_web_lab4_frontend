import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidationService} from "../validation.service";
import {UserForm, UserRegistration} from "../dto/userDto";
import {StorageService} from "../storage.service";
import {AuthenticationService} from "../authentication.service";
import {MapperService} from "../mapper.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Input("username") givenUsername?: string;

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl<string>('',
      [Validators.required,
        Validators.maxLength(25),
        this.validationService.usernameValidator()]),
    password: new FormControl<string>('',
      [Validators.required]),
    isToSave: new FormControl<boolean>(true)
  })

  constructor(private validationService: ValidationService,
              private storageService: StorageService,
              private authenticationService: AuthenticationService,
              private mapperService: MapperService) {
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
    this.authenticationService.register(this.mapperService.mapUserFormToRegistration(givenUser));
  }

}
