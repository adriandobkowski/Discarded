import { Component, computed, effect, HostListener, inject, input, signal } from '@angular/core';
import { UserProps } from '../../../types';
import { Search } from '../search/search';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, MessageCircle, EllipsisVertical } from 'lucide-angular';
import { UserService } from '../../../services/user/user-service';
import { RouteService } from '../../../services/route/route-service';
@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [Search, ProfileImage, LucideAngularModule],
  template: `
    <div class="flex flex-col h-full">
      <nav class="border-b border-slate-700 p-4">
        <app-search [(search)]="search" />
      </nav>
      <div class="text-slate-400 text-sm px-4 py-3 border-b border-slate-700">
        @if (!currentRoute().includes('/all')) {
          Active friends - {{ this.filteredfriends().length }}
        } @else {
          All friends - {{ this.filteredfriends().length }}
        }
      </div>
      <main class="flex-1 overflow-y-auto" (scroll)="closeMenu()">
        @for (user of filteredfriends(); track user.id) {
          <div
            class="border-b border-slate-700 hover:bg-slate-700/50 transition-colors p-4 flex items-center justify-between group"
          >
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <app-profile-image [src]="user?.img" [status]="user?.status" />
              <div class="min-w-0 flex-1">
                <div class="font-semibold text-white text-sm truncate">{{ user?.username }}</div>
                <div class="text-slate-400 text-xs truncate">{{ user.status }}</div>
              </div>
            </div>
            <div class="relative flex gap-2 ml-2">
              <button
                class="p-2 bg-[#2B2D31] hover:text-gray-400 rounded-full transition-colors text-white cursor-pointer"
                (click)="toggleMenu(user.id, $event)"
              >
                <lucide-icon [img]="EllipsisVertical" class="w-5 h-5" />
              </button>

              @if (activeMenuUserId() === user.id) {
                <button
                  class="more-menu"
                  (click)="$event.stopPropagation()"
                  [style.top]="menuPosition().top"
                  [style.right]="menuPosition().right"
                >
                  <button
                    class="more-menu__item text-red-500 hover:text-red-400"
                    (click)="removeFriend(user.id)"
                  >
                    Remove friend
                  </button>
                </button>
              }
            </div>
          </div>
        }
      </main>
    </div>
  `,
  styleUrl: './friends-page.scss',
})
export class FriendsPage {
  readonly MessageCircle = MessageCircle;
  readonly EllipsisVertical = EllipsisVertical;

  private userService = inject(UserService);
  private routeService = inject(RouteService);

  currentRoute = this.routeService.currentRoute;

  activeMenuUserId = signal<string | null>(null);
  menuPosition = signal<{ top: string; right: string }>({ top: '0px', right: '0px' });

  @HostListener('document:click')
  closeMenu() {
    this.activeMenuUserId.set(null);
  }

  toggleMenu(userId: string, event: Event) {
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

  friendsInput = input<UserProps[]>([]);

  friends = signal<UserProps[]>([]);

  search = signal<string>('');

  constructor() {
    effect(() => {
      this.friends.set(this.friendsInput());
    });
  }
  filteredfriends = computed(() =>
    this.friends().filter((user) =>
      user.username.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );
  removeFriend(id: string): void {
    this.userService.removeFriend(id).subscribe({
      next: () => {
        this.friends.update((f) => f.filter((user) => user.id !== id));
      },
      error: (err) => console.error(err),
    });
  }
}
