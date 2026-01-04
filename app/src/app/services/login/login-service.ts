import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProps } from '../../types';
import { HttpClient } from '@angular/common/http';
import { url } from '../../../api';

interface LoginProps {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  login(userInfo: LoginProps): Observable<UserProps> {
    return this.http.post<UserProps>(`${url}/login`, { ...userInfo });
  }
}
