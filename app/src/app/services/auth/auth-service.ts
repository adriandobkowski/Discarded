import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { LoginProps, LoginResponse, UserProps } from '../../types';
import { map, Observable, switchMap, tap } from 'rxjs';
import { url } from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = signal<string | null>(localStorage.getItem('token'));
  isAuthenticated = computed(() => !!this.token());
  private http = inject(HttpClient);

  user = signal<UserProps | null>(null);
  user$ = toObservable(this.user);

  constructor() {
    effect(() => {
      const accessToken = this.token();
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      } else {
        localStorage.removeItem('token');
      }
    });

    this.restoreUser();
  }

  restoreUser() {
    const userId = localStorage.getItem('userId');
    const token = this.token();

    if (userId && token && !this.user()) {
      this.http.get<UserProps>(`${url}/users/${userId}`).subscribe({
        next: (user) => {
          this.user.set({ ...user, status: 'online' });
        },
        error: () => {
          this.logout();
        },
      });
    }
  }

  register(user: LoginProps & UserProps) {
    return this.http
      .post<LoginResponse>(`${url}/register`, {
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
              img: '',
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
        if (response.accessToken) {
          this.token.set(response.accessToken);
        }
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
        localStorage.setItem('userId', currentUser.id.toString());
        return currentUser;
      }),
    );
  }
  logout() {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }
}
