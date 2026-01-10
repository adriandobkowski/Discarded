import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { ExtendedChatProps, Status, UserProps } from '../../types';
import { ChatProps } from '../../types';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);

  id = this.authService.user()?.id;

  microphoneActive = signal<boolean>(true);
  headphonesActive = signal<boolean>(true);

  findById(): Observable<HttpResponse<UserProps>> {
    return this.http.get<UserProps>(`${url}/${this.id}`, { observe: 'response' });
  }

  findFriends(status?: Status): Observable<UserProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.id}`).pipe(
      switchMap((user) =>
        this.http.get<UserProps[]>(`${url}/users?${status ? 'status=' + status : ''}`, {
          params: { id: user.friends },
        }),
      ),
    );
  }
  findChattedWithUsers(): Observable<ExtendedChatProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.id}`).pipe(
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
            const otherUserId = chat.userIds.find((userId) => userId !== this.id);
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
    return this.http.patch<UserProps>(`${url}/users/${this.id}`, { ...formData });
  }
  findChattedWithUser(chatId: string): Observable<UserProps> {
    return this.http.get<ChatProps>(`${url}/chats/${chatId}`).pipe(
      map((chat: ChatProps) => chat.userIds.filter((userId: string) => userId !== this.id)[0]),
      switchMap((userId: string) => {
        return this.http.get<UserProps>(`${url}/users/${userId}`);
      }),
    );
  }
}
