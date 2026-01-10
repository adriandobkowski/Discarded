import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ChannelProps, RoomProps, UserProps } from '../../types';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  user = this.authService.user;

  channels = signal<ChannelProps[]>([]);

  currentChannel = signal<ChannelProps | null>(null);

  messageDisabled = signal<boolean>(false);

  findAll(): Observable<ChannelProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.user()?.id}`).pipe(
      map((user: UserProps) => user.channels),
      switchMap((channelIds: string[]) => {
        if (channelIds.length === 0) {
          return of([]);
        }
        return forkJoin(
          channelIds.map((channelId: string) => {
            return this.http.get<ChannelProps>(`${url}/channels/${channelId}`);
          }),
        );
      }),
    );
  }
  findById(id: string): Observable<ChannelProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${id}`);
  }
  findRoomsById(id: string): Observable<RoomProps[]> {
    return this.http.get<ChannelProps>(`${url}/channels/${id}`).pipe(
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
  createChannel(channelData: ChannelProps): Observable<ChannelProps> {
    return this.http.post<ChannelProps>(`${url}/channels`, { ...channelData });
  }

  addToChannel(userId: string): Observable<ChannelProps> {
    const channel = this.currentChannel();
    if (!channel) {
      throw new Error('No active channel selected');
    }
    return this.http.patch<ChannelProps>(`${url}/channels/${channel.id}`, {
      userIds: [...channel.userIds, userId],
    });
  }
}
