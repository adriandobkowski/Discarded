import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { ChannelProps } from '../../types/channel';
import { UserProps } from '../../types/user';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  public user = this.authService.user;

  public channelUsers = signal<UserProps[]>([]);

  public createChannelClicked = signal<boolean>(false);

  public inviteToChannelModalActive = signal<boolean>(false);

  public createRoomClicked = signal<boolean>(false);

  public activeChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'online'),
  );
  public busyChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'busy'),
  );
  public inactiveChannelUsers = computed(() =>
    this.channelUsers().filter((user: UserProps) => user.status === 'offline'),
  );

  public channelId = signal<string | null>(null);

  public channels = signal<ChannelProps[]>([]);

  public currentChannel = signal<ChannelProps | null>(null);

  public findAll(): Observable<ChannelProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.user()!.id}`).pipe(
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
  public findById(): Observable<ChannelProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.channelId()}`);
  }

  public getById(id: string): Observable<ChannelProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${id}`);
  }

  public createChannel(channelData: ChannelProps): Observable<UserProps> {
    const userId = this.user()!.id;

    return this.http.post<ChannelProps>(`${url}/channels`, channelData).pipe(
      switchMap((newChannel) =>
        this.http.get<UserProps>(`${url}/users/${userId}`).pipe(
          switchMap((user) =>
            this.http.patch<UserProps>(`${url}/users/${userId}`, {
              channels: [...user.channels, newChannel.id],
            }),
          ),
          tap(() => this.channels.update((channels: ChannelProps[]) => [...channels, newChannel])),
        ),
      ),
    );
  }

  public createChannelAndReturnChannel(channelData: ChannelProps): Observable<ChannelProps> {
    const userId = this.user()!.id;

    return this.http.post<ChannelProps>(`${url}/channels`, channelData).pipe(
      switchMap((newChannel) =>
        this.http.get<UserProps>(`${url}/users/${userId}`).pipe(
          switchMap((user) =>
            this.http.patch<UserProps>(`${url}/users/${userId}`, {
              channels: [...user.channels, newChannel.id],
            }),
          ),
          tap(() => this.channels.update((channels: ChannelProps[]) => [...channels, newChannel])),
          map(() => newChannel),
        ),
      ),
    );
  }

  public updateChannel(id: string, patch: Partial<ChannelProps>): Observable<ChannelProps> {
    return this.http.patch<ChannelProps>(`${url}/channels/${id}`, patch).pipe(
      tap((updated) => {
        this.channels.update((list) => list.map((c) => (c.id === updated.id ? updated : c)));

        const current = this.currentChannel();
        if (current?.id === updated.id) {
          this.currentChannel.set(updated);
        }
      }),
    );
  }

  public findChannelUsers(): Observable<UserProps[]> {
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
  public inviteToChannel(userId: string): Observable<ChannelProps> {
    return this.http.get<ChannelProps>(`${url}/channels/${this.channelId()}`).pipe(
      switchMap((channel) => {
        if (channel.userIds.includes(userId)) {
          return of(channel);
        }

        const updatedUserIds = [...channel.userIds, userId];

        return this.http
          .patch<ChannelProps>(`${url}/channels/${this.channelId()}`, {
            userIds: updatedUserIds,
          })
          .pipe(
            switchMap((updatedChannel) =>
              this.http
                .get<UserProps>(`${url}/users/${userId}`)
                .pipe(map((user) => ({ updatedChannel, user }))),
            ),
            switchMap(({ updatedChannel, user }) => {
              const updatedChannels = user.channels.includes(updatedChannel.id!)
                ? user.channels
                : [...user.channels, updatedChannel.id];

              return this.http
                .patch<UserProps>(`${url}/users/${userId}`, {
                  channels: updatedChannels,
                })
                .pipe(map(() => updatedChannel));
            }),
          );
      }),
    );
  }

  public findFriendsToInviteToChannel(): Observable<UserProps[]> {
    const channel = this.currentChannel();
    const user = this.user();

    if (!channel || !user) {
      return of([]);
    }

    const usersInChannel = new Set(channel.userIds);

    const friendIdsToInvite = user.friends.filter(
      (friendId: string) => !usersInChannel.has(friendId),
    );

    if (!friendIdsToInvite.length) {
      return of([]);
    }

    return this.http
      .get<UserProps[]>(`${url}/users`)
      .pipe(
        map((users: UserProps[]) => users.filter((user) => friendIdsToInvite.includes(user.id))),
      );
  }
}
