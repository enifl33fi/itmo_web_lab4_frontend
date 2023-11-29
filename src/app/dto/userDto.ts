export interface UserForm {
  username: string;
  password: string;
  isToSave: boolean;
}

export interface RegUserForm extends UserForm {

}
export interface LoginUserForm extends UserForm {

}

export interface UserAuth {
  username: string;
  password: string;
}

export interface UserRegistration extends UserAuth{
}

export interface UserLogin extends UserAuth{
}

export interface UserUnique {
  unique: boolean;
}
