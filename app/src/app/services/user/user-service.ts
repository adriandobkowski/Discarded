import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, filter, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ExtendedUserProps, Status, UserProps } from '../../types';
import { ChatProps } from '../../types';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);

  routerUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  currentRoute = computed(() => this.routerUrl());

  private authService = inject(AuthService);

  microphoneActive = signal<boolean>(true);
  headphonesActive = signal<boolean>(true);

  activeUsers = signal<UserProps[]>([]);

  addFriendIsOpen = signal<boolean>(false);

  closeProfileFooter = signal<boolean>(false);
  statusModalOpen = signal<boolean>(false);

  friendRequests = signal<string[]>([]);

  inboxActive = signal<boolean>(false);

  inviteToChannelModalActive = signal<boolean>(false);

  findById(): Observable<UserProps> {
    return this.http.get<UserProps>(`${url}/${this.authService.user()!.id}`);
  }

  findFriends(status?: Status): Observable<UserProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
      switchMap((user) => {
        if (!user.friends || user.friends.length === 0) {
          return of([]);
        }

        const params: Record<string, string | string[]> = {
          id: user.friends,
        };

        if (status) {
          params['status'] = status;
        }

        return this.http.get<UserProps[]>(`${url}/users`, { params });
      }),
    );
  }
  findChattedWithUsers(): Observable<ExtendedUserProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
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
            const otherUserId = chat.userIds.find(
              (userId) => userId !== this.authService.user()!.id,
            );
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
    return this.http.patch<UserProps>(`${url}/users/${this.authService.user()!.id}`, {
      ...formData,
    });
  }
  findChattedWithUser(chatId: string): Observable<UserProps> {
    return this.http.get<ChatProps>(`${url}/chats/${chatId}`).pipe(
      map(
        (chat: ChatProps) =>
          chat.userIds.find((userId: string) => userId !== this.authService.user()!.id) as string,
      ),
      switchMap((userId: string) => {
        return this.http.get<UserProps>(`${url}/users/${userId}`);
      }),
    );
  }
  sendFriendRequest(username: string): Observable<UserProps> {
    return this.http.get<UserProps[]>(`${url}/users?username=${username}`).pipe(
      map((users) => {
        if (!users || users.length === 0) {
          throw new Error('User not found');
        }
        return users[0].id;
      }),
      switchMap((friendId) => {
        console.log(friendId, this.authService.user()!.id);
        if (friendId === this.authService.user()!.id) {
          return EMPTY;
        }

        if (this.friendRequests().includes(friendId)) {
          return EMPTY;
        }

        return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
          map((user) => ({
            friendRequests: [...(user.friendRequests ?? []), friendId],
          })),
          switchMap((payload) =>
            this.http.patch<UserProps>(`${url}/users/${this.authService.user()!.id}`, payload),
          ),
          tap(() => {
            this.friendRequests.update((requests) => [...requests, friendId]);
          }),
        );
      }),
    );
  }

  acceptFriendRequest(friendId: string): Observable<ChatProps> {
    const newChatId = uuidv4();
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
      map((user: UserProps) => ({
        friendRequests: user.friendRequests.filter((id: string) => id !== friendId),
        friends: [...user.friends, friendId],
        chats: [...user.chats, newChatId],
      })),
      switchMap((payload) =>
        this.http.patch<UserProps>(`${url}/users/${this.authService.user()!.id}`, payload),
      ),
      switchMap(() =>
        this.http.post<ChatProps>(`${url}/chats`, {
          id: newChatId,
          userIds: [this.authService.user()!.id, friendId],
          messages: [],
        }),
      ),
      tap(() => {
        this.friendRequests.update((requests: string[]) =>
          requests.filter((reqId: string) => reqId !== friendId),
        );
      }),
    );
  }
  denyFriendRequest(friendId: string): Observable<UserProps> {
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
      map((user: UserProps) => ({
        friendRequests: user.friendRequests.filter((id: string) => id !== friendId),
      })),
      switchMap((payload) =>
        this.http.patch<UserProps>(`${url}/users/${this.authService.user()!.id}`, payload),
      ),
    );
  }
  removeFriend(friendId: string): Observable<UserProps> {
    const userId = this.authService.user()!.id;

    return this.http.get<UserProps>(`${url}/users/${userId}`).pipe(
      map((user: UserProps) => ({
        friends: user.friends.filter((id) => id !== friendId),
      })),
      switchMap((payload) => this.http.patch<UserProps>(`${url}/users/${userId}`, payload)),
      tap(() => {
        this.activeUsers.update((users) => users.filter((u) => u.id !== friendId));
      }),
    );
  }
  findUsersByFriendRequests(ids: string[]): Observable<UserProps[]> {
    if (ids.length === 0) return of([]);
    return forkJoin(ids.map((id: string) => this.http.get<UserProps>(`${url}/users/${id}`)));
  }
}
