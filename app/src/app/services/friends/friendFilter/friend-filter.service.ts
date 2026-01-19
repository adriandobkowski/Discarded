import { computed, inject, Injectable, signal } from '@angular/core';
import { FriendsSortOption, FriendsStatusFilter, UserProps } from '../../../types';
import { RouteService } from '../../route/route-service';
import { FriendStoreService } from '../friendStore/friend-store.service';

@Injectable({
  providedIn: 'root',
})
export class FriendFilterService {
  private routeService = inject(RouteService);
  private friendStoreService = inject(FriendStoreService);

  public friends = this.friendStoreService.friends;

  public search = signal<string>('');

  public statusFilter = signal<FriendsStatusFilter>('all');
  public hasAvatarOnly = signal<boolean>(false);
  public sortOption = signal<FriendsSortOption>('username-asc');

  public isActiveRoute = this.routeService.isActiveRoute;

  public filteredfriends = computed(() => {
    const query = this.search().trim().toLowerCase();

    const effectiveStatusFilter: FriendsStatusFilter = this.isActiveRoute()
      ? 'online'
      : this.statusFilter();

    const filtered = this.friends().filter((user) => {
      if (query && !user.username.toLowerCase().includes(query)) return false;
      if (effectiveStatusFilter !== 'all' && user.status !== effectiveStatusFilter) return false;
      if (this.hasAvatarOnly() && !user.img) return false;

      return true;
    });

    const option = this.sortOption();
    const sorted = [...filtered].sort((a, b) => {
      switch (option) {
        case 'username-asc':
          return a.username.localeCompare(b.username);
        case 'username-desc':
          return b.username.localeCompare(a.username);
        case 'createdAt-desc':
          return this.createdAtMs(b) - this.createdAtMs(a);
        case 'createdAt-asc':
          return this.createdAtMs(a) - this.createdAtMs(b);
        case 'friendsCount-desc':
          return b.friends.length - a.friends.length;
        case 'friendsCount-asc':
          return a.friends.length - b.friends.length;
      }
    });

    return sorted;
  });

  protected createdAtMs(user: UserProps): number {
    return Date.parse(user.createdAt) || 0;
  }
}
