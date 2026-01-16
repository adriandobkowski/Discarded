import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ChatProps, ExtendedUserProps, Status, UserProps } from '../../types';
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

  public activeUsers = signal<UserProps[]>([]);

  public addFriendIsOpen = signal<boolean>(false);

  public closeProfileFooter = signal<boolean>(false);
  public statusModalOpen = signal<boolean>(false);

  public friendRequests = signal<string[]>([]);

  public inboxActive = signal<boolean>(false);

  public inviteToChannelModalActive = signal<boolean>(false);

 public  deleteAccountClicked = signal<boolean>(false);

 public findById(): Observable<UserProps> {
    return this.http.get<UserProps>(`${url}/${this.authService.user()!.id}`);
  }

  public findFriends(status?: Status): Observable<UserProps[]> {
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
      switchMap((user) => {
        if (user.friends.length === 0) {
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
  public findChattedWithUsers(): Observable<ExtendedUserProps[]> {
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
  public updateUser(formData: Partial<UserProps>): Observable<UserProps> {
    return this.http.patch<UserProps>(`${url}/users/${this.authService.user()!.id}`, {
      ...formData,
    });
  }
  public findChattedWithUser(chatId: string): Observable<UserProps> {
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
  public sendFriendRequest(username: string): Observable<UserProps> {
    return this.http.get<UserProps[]>(`${url}/users?username=${username}`).pipe(
      map((users) => {
        if (users.length === 0) {
          throw new Error('User not found');
        }
        
return users[0].id;
      }),
      switchMap((friendId) => {
        if (friendId === this.authService.user()!.id) {
          return EMPTY;
        }

        if (this.friendRequests().includes(friendId)) {
          return EMPTY;
        }

        return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
          map((user) => ({
            friendRequests: [...(user.friendRequests.length > 0 ? user.friendRequests : []), friendId],
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

  public acceptFriendRequest(friendId: string): Observable<ChatProps> {
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
  public denyFriendRequest(friendId: string): Observable<UserProps> {
    return this.http.get<UserProps>(`${url}/users/${this.authService.user()!.id}`).pipe(
      map((user: UserProps) => ({
        friendRequests: user.friendRequests.filter((id: string) => id !== friendId),
      })),
      switchMap((payload) =>
        this.http.patch<UserProps>(`${url}/users/${this.authService.user()!.id}`, payload),
      ),
    );
  }
  public removeFriend(friendId: string): Observable<UserProps> {
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
  public findUsersByFriendRequests(ids: string[]): Observable<UserProps[]> {
    if (ids.length === 0) return of([]);
    
return forkJoin(ids.map((id: string) => this.http.get<UserProps>(`${url}/users/${id}`)));
  }
  public deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${url}/users/${this.authService.user()!.id}`);
  }
}
