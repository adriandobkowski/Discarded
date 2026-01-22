import { Component, effect, HostListener, inject, input } from '@angular/core';
import { SearchComponent } from '../search/search';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, MessageCircle, EllipsisVertical } from 'lucide-angular';
import { RouteService } from '../../../services/route/route-service';
import { FriendService } from '../../../services/friends/friend/friend-service.service';
import { UserProps } from '../../../types/user';
import { FriendFilterService } from '../../../services/friends/friendFilter/friend-filter.service';
import { FriendStoreService } from '../../../services/friends/friendStore/friend-store.service';
import { FriendMenuService } from '../../../services/friends/friendMenu/friend-menu.service';
import { UserService } from '../../../services/user/user-service';
import { ToastService } from '../../../services/toast/toast.service';
@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [SearchComponent, ProfileImageComponent, LucideAngularModule],
  templateUrl: './friends-page.html',
  styleUrl: './friends-page.scss',
  host: {
    class: 'h-full',
  },
})
export class FriendsPage {
  protected readonly MessageCircle = MessageCircle;
  protected readonly EllipsisVertical = EllipsisVertical;

  private routeService = inject(RouteService);

  private userService = inject(UserService);

  private friendService = inject(FriendService);
  private friendFilterService = inject(FriendFilterService);

  private friendStoreService = inject(FriendStoreService);

  private friendMenuService = inject(FriendMenuService);

  private toastService = inject(ToastService);

  protected currentRoute = this.routeService.currentRoute;
  protected activeMenuUserId = this.friendService.activeMenuUserId;

  protected friendsInput = input<UserProps[]>([]);

  protected friends = this.friendStoreService.friends;

  protected isActiveRoute = this.routeService.isActiveRoute;

  protected search = this.friendFilterService.search;

  protected statusFilter = this.friendFilterService.statusFilter;

  protected hasAvatarOnly = this.friendFilterService.hasAvatarOnly;

  protected sortOption = this.friendFilterService.sortOption;

  protected filteredfriends = this.friendFilterService.filteredfriends;

  protected menuPosition = this.friendMenuService.menuPosition;

  protected toggleMenu = this.friendMenuService.toggleMenu.bind(this.friendMenuService);

  public constructor() {
    effect(() => {
      this.userService.findFriends().subscribe({
        next: (friends: UserProps[]) => {
          this.friends.set(friends);
        },
        error: (err) => {
          this.toastService.errorFrom(err, 'Error finding friends');
        },
      });
    });
  }
  @HostListener('document:click')
  protected closeMenu(): void {
    this.activeMenuUserId.set(null);
  }
  protected remove(id: string): void {
    this.friendService.removeFriend(id).subscribe({
      next: () => {
        this.friends.update((f) => f.filter((user) => user.id !== id));
      },
      error: (err) => this.toastService.errorFrom(err, 'Could not remove friend', 'Error'),
    });
  }
}
