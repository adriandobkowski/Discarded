import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { ChatProps, ExtendedUserProps, UserProps } from '../../types';
import { url } from '../../../api';
import { AuthService } from '../auth/auth-service';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);

  public microphoneActive = signal<boolean>(true);

  public headphonesActive = signal<boolean>(true);

  public friendsToInvite = signal<UserProps[]>([]);

  public activeUsers = signal<UserProps[]>([]);

  public addFriendIsOpen = signal<boolean>(false);

  public closeProfileFooter = signal<boolean>(false);

  public statusModalOpen = signal<boolean>(false);

  public inboxActive = signal<boolean>(false);

  public inviteToChannelModalActive = signal<boolean>(false);

  public deleteAccountClicked = signal<boolean>(false);

  protected user = this.authService.user;

  public findById(): Observable<UserProps> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.get<UserProps>(`${url}/users/${currentUser.id}`);
  }

  public findFriends(): Observable<UserProps[]> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.get<UserProps>(`${url}/users/${currentUser.id}`).pipe(
      switchMap((user) => {
        if (user.friends.length === 0) {
          return of([]);
        }

        const params: Record<string, string | string[]> = {
          id: user.friends,
        };

        return this.http.get<UserProps[]>(`${url}/users`, { params });
      }),
    );
  }
  public findChattedWithUsers(): Observable<ExtendedUserProps[]> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.get<UserProps>(`${url}/users/${currentUser.id}`).pipe(
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
            const otherUserId = chat.userIds.find((userId) => userId !== currentUser.id);

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

  public updateUser(formData: Partial<UserProps>): Observable<UserProps> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.patch<UserProps>(`${url}/users/${currentUser.id}`, {
      ...formData,
    });
  }

  public findChattedWithUser(chatId: string): Observable<UserProps> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.get<ChatProps>(`${url}/chats/${chatId}`).pipe(
      map(
        (chat: ChatProps) =>
          chat.userIds.find((userId: string) => userId !== currentUser.id) as string,
      ),
      switchMap((userId: string) => {
        return this.http.get<UserProps>(`${url}/users/${userId}`);
      }),
    );
  }
  public sendFriendRequest(username: string): Observable<UserProps> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http
      .get<UserProps[]>(`${url}/users`, {
        params: { username },
      })
      .pipe(
        switchMap((users) => {
          if (!users.length) {
            return throwError(() => new Error('User not found'));
          }

          const friend = users[0];

          if (friend.id === currentUser.id) {
            return throwError(() => new Error('Cannot add yourself'));
          }

          if (currentUser.friends.includes(friend.id)) {
            return throwError(() => new Error('User already in friends'));
          }

          if (friend.friendRequests.includes(currentUser.id)) {
            return throwError(() => new Error('Request already sent'));
          }

          return this.http.patch<UserProps>(`${url}/users/${friend.id}`, {
            friendRequests: [...friend.friendRequests, currentUser.id],
          });
        }),
      );
  }

  public acceptFriendRequest(friendId: string): Observable<void> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http
      .get<ChatProps[]>(`${url}/chats`, {
        params: { userIds_like: currentUser.id },
      })
      .pipe(
        switchMap((chats) => {
          const existingChat = chats.find((chat) => chat.userIds.includes(friendId));

          const chatId = existingChat?.id ?? uuidv4();

          const updateCurrentUser$ = this.http.patch(`${url}/users/${currentUser.id}`, {
            friendRequests: currentUser.friendRequests.filter((id) => id !== friendId),
            friends: currentUser.friends.includes(friendId)
              ? currentUser.friends
              : [...currentUser.friends, friendId],
            chats: existingChat ? currentUser.chats : [...currentUser.chats, chatId],
          });

          const updateFriend$ = this.http.get<UserProps>(`${url}/users/${friendId}`).pipe(
            switchMap((friend: UserProps) =>
              this.http.patch(`${url}/users/${friendId}`, {
                friends: friend.friends.includes(currentUser.id)
                  ? friend.friends
                  : [...friend.friends, currentUser.id],
              }),
            ),
          );

          return updateCurrentUser$.pipe(
            switchMap(() => updateFriend$),
            switchMap(() => {
              if (existingChat) {
                return of(void 0);
              }

              return this.http.post<void>(`${url}/chats`, {
                id: chatId,
                userIds: [currentUser.id, friendId],
                messages: [],
              });
            }),
          );
        }),
      );
  }
  public denyFriendRequest(friendId: string): Observable<UserProps> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.get<UserProps>(`${url}/users/${currentUser.id}`).pipe(
      map((user: UserProps) => ({
        friendRequests: user.friendRequests.filter((id: string) => id !== friendId),
      })),
      switchMap((payload) => this.http.patch<UserProps>(`${url}/users/${currentUser.id}`, payload)),
    );
  }
  public removeFriend(friendId: string): Observable<void> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    const userId = currentUser.id;

    return this.http.get<UserProps>(`${url}/users/${userId}`).pipe(
      switchMap((user) => {
        const updatedUser = { friends: user.friends.filter((id) => id !== friendId) };

        return this.http.patch<UserProps>(`${url}/users/${userId}`, updatedUser);
      }),
      switchMap(() => this.http.get<UserProps>(`${url}/users/${friendId}`)),
      switchMap((friendUser) => {
        const updatedFriend = { friends: friendUser.friends.filter((id) => id !== currentUser.id) };

        return this.http.patch<void>(`${url}/users/${friendId}`, updatedFriend);
      }),
      tap(() => {
        this.activeUsers.update((users) => users.filter((u) => u.id !== friendId));
      }),
    );
  }

  public findUsersByFriendRequests(): Observable<UserProps[]> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.get<UserProps>(`${url}/users/${currentUser.id}`).pipe(
      map((user: UserProps) => user.friendRequests),
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
  public deleteAccount(): Observable<void> {
    const currentUser = this.user();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.delete<void>(`${url}/users/${currentUser.id}`);
  }
}
