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

  inviteToChannelModalActive = signal<boolean>(false);

  activeChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'online'),
  );
  busyChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'busy'),
  );
  inactiveChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'offline'),
  );

  channelId = signal<string | null>(null);

  channels = signal<ChannelProps[]>([]);

  currentChannel = signal<ChannelProps | null>(null);

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
  findById(): Observable<ChannelProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.channelId()}`);
  }

  createChannel(channelData: ChannelProps): Observable<ChannelProps> {
    return this.http.post<ChannelProps>(`${url}/channels`, { ...channelData });
  }

  findChannelUsers(): Observable<UserProps[]> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.channelId()}`).pipe(
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
  inviteToChannel(userId: string): Observable<ChannelProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.channelId()}`).pipe(
      switchMap((channel) => {
        if (channel.userIds.includes(userId)) {
          return of(channel);
        }

        const updatedUserIds = [...channel.userIds, userId];

        return this.http.patch<ChannelProps>(`${url}/channels/${this.channelId()}`, {
          userIds: updatedUserIds,
        });
      }),
    );
  }
  findFriendsToInviteToChannel(): Observable<UserProps[]> {
    return this.http
      .get<ChannelProps>(`${url}/channels/${this.channelId()}`)
      .pipe(
        switchMap((channel: ChannelProps) =>
          this.http
            .get<UserProps[]>(`${url}/users`)
            .pipe(map((users) => users.filter((user) => !channel.userIds.includes(user.id)))),
        ),
      );
  }
}
