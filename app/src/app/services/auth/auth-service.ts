import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginProps, LoginResponse, UserProps } from '../../types';
import { map, Observable, switchMap, tap } from 'rxjs';
import { url } from '../../../api';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = computed(() => !!this.token());

  private http = inject(HttpClient);

  public token = signal<string | null>(localStorage.getItem('token'));

  public user = signal<UserProps | null>(
    localStorage.getItem('user')
      ? (JSON.parse(localStorage.getItem('user') || 'null') as UserProps)
      : null,
  );

  public user$ = toObservable(this.user);

  public register(user: LoginProps & UserProps): Observable<UserProps> {
    return this.http
      .post<LoginResponse>(`${url}/register`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        switchMap((res) => {
          const userId = res.user.id;

          return this.http.patch<UserProps>(`${url}/users/${userId}`, {
            username: user.username,
            friends: [],
            channels: [],
            chats: [],
            img: '',
            createdAt: new Date().toISOString(),
          });
        }),
      );
  }

  public login(user: LoginProps): Observable<UserProps> {
    return this.http.post<LoginResponse>(`${url}/login`, user).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.token.set(response.accessToken);
          localStorage.setItem('token', response.accessToken);
        }
      }),
      switchMap(() => {
        return this.http.get<UserProps[]>(`${url}/users?email=${user.email}`);
      }),
      map((users) => {
        const currentUser: UserProps = {
          ...users[0],
        };
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.user.set(currentUser);

        return currentUser;
      }),
    );
  }
  public logout(): void {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
