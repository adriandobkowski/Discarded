import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ChatProps, ExtendedUserProps, UserProps } from '../../types';
import { map, Observable, switchMap } from 'rxjs';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);

  user = this.authService.user;

  chattedWithUser = signal<UserProps | null>(null);

  chattedWithUsers = signal<ExtendedUserProps[]>([]);

  currentChat = signal<ChatProps | null>(null);

  findChattedWithUser(id: string): Observable<UserProps> {
    return this.http.get<ChatProps>(`${url}/chats/${id}`).pipe(
      map(
        (chat: ChatProps) => chat.userIds.filter((userId: string) => userId !== this.user()?.id)[0],
      ),
      switchMap((userId: string) => {
        return this.http.get<UserProps>(`${url}/users/${userId}`);
      }),
    );
  }
  findChatById(id: string): Observable<ChatProps> {
    return this.http.get<ChatProps>(`${url}/chats/${id}`);
  }
}
