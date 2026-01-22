import { UserProps } from './user';
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
