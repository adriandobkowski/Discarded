import { computed, Injectable, signal } from '@angular/core';
import { UserProps } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class FriendStoreService {
  public friends = signal<UserProps[]>([]);

  public onlineFriends = computed(() => {
    return this.friends().filter((friend: UserProps) => friend.status === 'online');
  });

  public busyFriends = computed(() => {
    return this.friends().filter((friend: UserProps) => friend.status === 'busy');
  });

  public offlineFriends = computed(() => {
    return this.friends().filter((friend: UserProps) => friend.status === 'offline');
  });
}
