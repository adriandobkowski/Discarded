import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { ExtendedUserProps, Status, UserProps } from '../../types';
import { ChatProps } from '../../types';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);

  microphoneActive = signal<boolean>(true);
  headphonesActive = signal<boolean>(true);

  activeUsers = signal<UserProps[]>([]);

  addFriendIsOpen = signal<boolean>(false);

  findById(): Observable<HttpResponse<UserProps>> {
    return this.http.get<UserProps>(`${url}/${this.authService.user()?.id}`, {
      observe: 'response',
    });
  }

  findFriends(status?: Status): Observable<UserProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()?.id}`).pipe(
      switchMap((user) => {
        if (!user.friends || user.friends.length === 0) {
          return of([]);
        }

        const params: any = {
          id: user.friends,
        };

        if (status) {
          params.status = status;
        }

        return this.http.get<UserProps[]>(`${url}/users`, { params });
      }),
    );
  }
  findChattedWithUsers(): Observable<ExtendedUserProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()?.id}`).pipe(
      map((user) => user.chats),
      switchMap((chatIds) => {
        if (chatIds.length === 0) return of([]);
        return forkJoin(
          chatIds.map((chatId) => this.http.get<ChatProps>(`${url}/chats/${chatId}`)),
        );
      }),
      map((chats: ChatProps[]) => {
        return chats
          .map((chat) => {
            const otherUserId = chat.userIds.find(
              (userId) => userId !== this.authService.user()?.id,
            );
            return otherUserId ? { otherUserId, chatId: chat.id } : null;
          })
          .filter((item): item is { otherUserId: string; chatId: string } => !!item);
      }),
      switchMap((pairs: { otherUserId: string; chatId: string }[]) => {
        if (pairs.length === 0) return of([]);
        return forkJoin(
          pairs.map((pair) =>
            this.http
              .get<UserProps>(`${url}/users/${pair.otherUserId}`)
              .pipe(map((user) => ({ user, chatId: pair.chatId }))),
          ),
        );
      }),
    );
  }
  updateUser(formData: Partial<UserProps>): Observable<UserProps> {
    return this.http.patch<UserProps>(`${url}/users/${this.authService.user()?.id}`, {
      ...formData,
    });
  }
  findChattedWithUser(chatId: string): Observable<UserProps> {
    return this.http.get<ChatProps>(`${url}/chats/${chatId}`).pipe(
      map(
        (chat: ChatProps) =>
          chat.userIds.find((userId: string) => userId !== this.authService.user()?.id) as string,
      ),
      switchMap((userId: string) => {
        return this.http.get<UserProps>(`${url}/users/${userId}`);
      }),
    );
  }
}
