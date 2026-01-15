import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ChatProps,
  ExtendedMessageProps,
  MessageProps,
  UserProps,
} from '../../types';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);

  user = this.authService.user;

  chatId = signal<string|null>(null)

  chattedWithUser = signal<UserProps | null>(null);

  currentChat = signal<ChatProps | null>(null);

  findChattedWithUser(): Observable<UserProps> {
    return this.http.get<ChatProps>(`${url}/chats/${this.chatId()}`).pipe(
      map(
        (chat: ChatProps) =>
          chat.userIds.find((userId: string) => userId !== this.user()?.id) as string,
      ),
      switchMap((userId: string) => {
        return this.http.get<UserProps>(`${url}/users/${userId}`);
      }),
    );
  }
  findChatById(): Observable<ChatProps> {
    return this.http.get<ChatProps>(`${url}/chats/${this.chatId()}`);
  }
  findMessagesByChatId(): Observable<ExtendedMessageProps[]> {
    return this.http.get<ChatProps>(`${url}/chats/${this.chatId()}`).pipe(
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

  sendMessage(message:MessageProps): Observable<ChatProps> {
    return this.http.get<ChatProps>(`${url}/chats/${this.chatId()}`).pipe(map((chat:ChatProps)=> {
      const updatedMessages = [...(chat.messages ?? []), message]
      return updatedMessages
    }), switchMap((messages: MessageProps[]) => this.http.patch<ChatProps>(`${url}/chats/${this.chatId()}`, {
      messages: messages
    })))
  }
}
