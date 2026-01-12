import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ChatProps,
  ExtendedMessageProps,
  ExtendedUserProps,
  MessageProps,
  UserProps,
} from '../../types';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';
import { WebSocketService } from '../ws/web-socket-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);

  private webSocketService = inject(WebSocketService);

  user = this.authService.user;

  chattedWithUser = signal<UserProps | null>(null);

  chattedWithUsers = signal<ExtendedUserProps[]>([]);

  currentChat = signal<ChatProps | null>(null);

  findChattedWithUser(id: string): Observable<UserProps> {
    return this.http.get<ChatProps>(`${url}/chats/${id}`).pipe(
      map(
        (chat: ChatProps) =>
          chat.userIds.find((userId: string) => userId !== this.user()?.id) as string,
      ),
      switchMap((userId: string) => {
        return this.http.get<UserProps>(`${url}/users/${userId}`);
      }),
    );
  }
  findChatById(id: string): Observable<ChatProps> {
    return this.http.get<ChatProps>(`${url}/chats/${id}`);
  }
  findMessagesByChatId(id: string): Observable<ExtendedMessageProps[]> {
    return this.http.get<ChatProps>(`${url}/chats/${id}`).pipe(
      map((chat: ChatProps) => chat.messages ?? []),
      switchMap((messages: MessageProps[]) => {
        if (messages.length === 0) {
          return of([]);
        }

        const uniqueUserIds = [...new Set(messages.map((m) => m.userId))];

        return forkJoin(
          uniqueUserIds.map((userId: string) => this.http.get<UserProps>(`${url}/users/${userId}`)),
        ).pipe(
          map((users: UserProps[]) => {
            const usersById = new Map(users.map((u) => [u.id, u]));
            return messages
              .filter((m) => !!m.userId && usersById.has(m.userId))
              .map((message) => ({
                user: usersById.get(message.userId)!,
                message,
              }));
          }),
        );
      }),
    );
  }

  updateMessages(message: MessageProps): void {
    if (this.currentChat()?.id !== message.chatId) {
      return;
    }
    this.currentChat.update((chat) => {
      if (chat) {
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      }
      return chat;
    });
  }
}
