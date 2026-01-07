import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { LoginProps, LoginResponse, UserProps } from '../../types';
import { map, Observable, switchMap, tap } from 'rxjs';
import { url } from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = signal<string | null>(localStorage.getItem('token'));
  isAuthenticated = computed(() => !!this.token());
  constructor() {
    effect(() => {
      const accessToken = this.token();
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      } else {
        localStorage.removeItem('token');
      }
    });
  }
  private http = inject(HttpClient);

  user = signal<UserProps | null>(null);

  register(user: LoginProps & UserProps) {
    return this.http
      .post<any>(`${url}/register`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        switchMap((res) => {
          const userId = res.user.id;

          return this.http.patch<UserProps>(
            `${url}/users/${userId}`,
            {
              username: user.username,
              friends: [],
              channels: [],
              chats: [],
              createdAt: new Date(),
            },
            {
              headers: {
                Authorization: `Bearer ${res.accessToken}`,
              },
              observe: 'response',
            },
          );
        }),
      );
  }

  login(user: LoginProps): Observable<UserProps> {
    return this.http.post<LoginResponse>(`${url}/login`, user).pipe(
      tap((response) => {
        console.log(response);
        // if (body) {
        //   console.log(body);
        //   this.token.set(body.accessToken);
        // }
      }),
      switchMap(() => {
        return this.http.get<UserProps[]>(`${url}/users?email=${user.email}`);
      }),
      map((users) => {
        const currentUser: UserProps = {
          ...users[0],
          status: 'online',
        };

        this.user.set(currentUser);
        return currentUser;
      }),
    );
  }
  logout() {
    this.token.set(null);
    this.user.set(null);
  }
}
