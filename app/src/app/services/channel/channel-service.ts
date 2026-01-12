import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ChannelProps, UserProps } from '../../types';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  user = this.authService.user;

  channelUsers = signal<UserProps[]>([]);

  createChannelClicked = signal<boolean>(false);

  activeChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'online'),
  );
  busyChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'busy'),
  );
  inactiveChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'offline'),
  );

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
  findChannelUsers(id: string): Observable<UserProps[]> {
    return this.http.get<ChannelProps>(`${url}/channels/${id}`).pipe(
      map((channel: ChannelProps) =>
        channel.userIds.filter((userId: string) => userId !== this.user()?.id),
      ),
      switchMap((userIds: string[]) => {
        if (userIds.length === 0) {
          return of([]);
        }
        return forkJoin(
          userIds.map((userId: string) => {
            return this.http.get<UserProps>(`${url}/users/${userId}`);
          }),
        );
      }),
    );
  }
}
