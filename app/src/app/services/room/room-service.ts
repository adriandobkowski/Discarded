import { inject, Injectable, signal } from '@angular/core';
import {
  ChannelProps,
  ExtendedMessageProps,
  MessageProps,
  RoomProps,
  UserProps,
} from '../../types';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChannelService } from '../channel/channel-service';
import { url } from '../../../api';
// import { MessageProps } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private http = inject(HttpClient);
  private channelService = inject(ChannelService);

  currentChannel = this.channelService.currentChannel;

  currentRoom = signal<RoomProps | null>(null);

  findRoomsByChannelId(): Observable<RoomProps[]> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.currentChannel()?.id}`).pipe(
      map((channel: ChannelProps) => channel.rooms),
      switchMap((roomIds: string[]) => {
        if (roomIds.length === 0) {
          return of([]);
        }
        return forkJoin(
          roomIds.map((roomId: string) => {
            return this.http.get<RoomProps>(`${url}/rooms/${roomId}`);
          }),
        );
      }),
    );
  }

  findRoomById(id: string): Observable<RoomProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.currentChannel()?.id}`).pipe(
      map((channel) => channel.rooms.find((roomId) => roomId === id) as string),
      switchMap((roomId: string) => {
        return this.http.get<RoomProps>(`${url}/rooms/${roomId}`);
      }),
    );
  }
  findMessagesByRoomId(id: string): Observable<ExtendedMessageProps[]> {
    return this.http.get<RoomProps>(`${url}/rooms/${id}`).pipe(
      map((room: RoomProps) => room.messages ?? []),
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
  // updateMessages(message: MessageProps): void {
  //   if (this.currentChat()?.id !== message.chatId) {
  //     return;
  //   }
  //   this.currentChat.update((chat) => {
  //     if (chat) {
  //       return {
  //         ...chat,
  //         messages: [...chat.messages, message],
  //       };
  //     }
  //     return chat;
  //   });
  // }
}
