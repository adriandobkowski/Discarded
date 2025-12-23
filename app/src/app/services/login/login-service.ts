import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProps } from '../../types';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
  login(userInfo: LoginProps): Observable<HttpResponse<UserProps>> {
    return this.http.post(`${url}/login`, { ...userInfo });
  }
}
