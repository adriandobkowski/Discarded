import { UserProps } from './user';
import { FormControl, FormGroup } from '@angular/forms';

export interface RegisterPayload {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
export interface LoginProps {
  readonly email: string;
  readonly password: string;
}
export interface LoginResponse {
  readonly accessToken: string;
  readonly user: UserProps;
}

export interface RegisterForm {
  email: FormControl<string>;
  credentials: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;
}
export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
