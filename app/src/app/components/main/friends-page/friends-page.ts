import { Component, computed, effect, HostListener, inject, input, signal } from '@angular/core';
import { FriendsSortOption, FriendsStatusFilter, UserProps } from '../../../types';
import { SearchComponent } from '../search/search';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, MessageCircle, EllipsisVertical } from 'lucide-angular';
import { UserService } from '../../../services/user/user-service';
import { RouteService } from '../../../services/route/route-service';
import { ToastService } from '../../../services/toast/toast-service';
@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [SearchComponent, ProfileImageComponent, LucideAngularModule],
  templateUrl: './friends-page.html',
  styleUrl: './friends-page.scss',
})

export class FriendsPage {
  protected readonly MessageCircle = MessageCircle;
  protected readonly EllipsisVertical = EllipsisVertical;

  private userService = inject(UserService);
  private routeService = inject(RouteService);
  private toastService = inject(ToastService);

  protected currentRoute = this.routeService.currentRoute;

 protected  activeMenuUserId = signal<string | null>(null);
 protected  menuPosition = signal<{ top: string; right: string }>({ top: '0px', right: '0px' });

  protected friendsInput = input<UserProps[]>([]);

  protected friends = signal<UserProps[]>([]);

  protected search = signal<string>('');

  protected statusFilter = signal<FriendsStatusFilter>('all');
  protected  hasAvatarOnly = signal<boolean>(false);
  protected sortOption = signal<FriendsSortOption>('username-asc');

  protected isActiveRoute = computed(() => this.currentRoute().includes('/active'));

   protected filteredfriends = computed(() => {
    const query = this.search().trim().toLowerCase();

    const effectiveStatusFilter: FriendsStatusFilter =
      this.isActiveRoute() ? 'online' : this.statusFilter();

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
          return (b.friends.length) - (a.friends.length);
        case 'friendsCount-asc':
          return (a.friends.length) - (b.friends.length);
      }
    });

    return sorted;
  });

   public constructor() {
    effect(() => {
      this.friends.set(this.friendsInput());
    });
  }

  @HostListener('document:click')
  protected closeMenu():void {
    this.activeMenuUserId.set(null);
  }

 protected  toggleMenu(userId: string, event: Event):void {
    event.stopPropagation();
    if (this.activeMenuUserId() === userId) {
      this.activeMenuUserId.set(null);
      
return;
    }

    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    this.menuPosition.set({
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`,
    });
    this.activeMenuUserId.set(userId);
  }

  private createdAtMs(user: UserProps): number {
    return Date.parse(user.createdAt) || 0;
  }
 
  protected removeFriend(id: string): void {
    this.userService.removeFriend(id).subscribe({
      next: () => {
        this.friends.update((f) => f.filter((user) => user.id !== id));
      },
      error: (err) => this.toastService.errorFrom(err, 'Could not remove friend', 'Error'),
    });
  }
}
