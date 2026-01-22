import { inject, Injectable, signal } from '@angular/core';
import { ChannelProps } from '../../types/channel';
import { ExtendedMessageProps, MessageProps } from '../../types/message';
import { RoomProps } from '../../types/room';
import { UserProps } from '../../types/user';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChannelService } from '../channel/channel-service';
import { url } from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private http = inject(HttpClient);
  private channelService = inject(ChannelService);

  public currentChannel = this.channelService.currentChannel;

  public roomId = signal<string | null>(null);
  public channelId = this.channelService.channelId;

  public currentRoom = signal<RoomProps | null>(null);

  public rooms = signal<RoomProps[]>([]);

  public findRoomsByChannelId(): Observable<RoomProps[]> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.channelId()!}`).pipe(
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
  public findRoomById(): Observable<RoomProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.channelId()}`).pipe(
      map((channel) => channel.rooms.find((rId) => rId === this.roomId()) as string),
      switchMap((roomId: string) => {
        return this.http.get<RoomProps>(`${url}/rooms/${roomId}`);
      }),
    );
  }
  public findMessagesByRoomId(): Observable<ExtendedMessageProps[]> {
    return this.http.get<RoomProps>(`${url}/rooms/${this.roomId()}`).pipe(
      map((room: RoomProps) => (room.messages.length > 0 ? room.messages : [])),
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

  public sendMessage(message: MessageProps): Observable<RoomProps> {
    return this.http.get<RoomProps>(`${url}/rooms/${this.roomId()}`).pipe(
      map((chat: RoomProps) => {
        const updatedMessages = [...(chat.messages.length > 0 ? chat.messages : []), message];

        return updatedMessages;
      }),
      switchMap((messages: MessageProps[]) =>
        this.http.patch<RoomProps>(`${url}/rooms/${this.roomId()}`, {
          messages: messages,
        }),
      ),
    );
  }
  public createRoom(name: string): Observable<ChannelProps> {
    return this.http
      .post<RoomProps>(`${url}/rooms`, { name: name, type: 'text', messages: [] })
      .pipe(
        switchMap((room: RoomProps) =>
          this.http.get<ChannelProps>(`${url}/channels/${this.channelId()!}`).pipe(
            map((channel: ChannelProps) => channel.rooms),
            switchMap((roomIds: string[]) =>
              this.http.patch<ChannelProps>(`${url}/channels/${this.channelId()!}`, {
                rooms: roomIds.includes(room.id) ? [...roomIds] : [...roomIds, room.id],
              }),
            ),
            tap(() => {
              this.rooms.update((previous: RoomProps[]) => [...previous, room]);
            }),
          ),
        ),
      );
  }
}
