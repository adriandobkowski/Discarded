import { Component, computed, inject, input, signal } from '@angular/core';
import { UserProps } from '../../../types';
import { Search } from '../../main/search/search';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, MessageCircle, EllipsisVertical } from 'lucide-angular';
@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [Search, ProfileImage, LucideAngularModule, RouterLink],
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
      <main class="flex-1 overflow-y-auto">
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
            <div class="flex gap-2 ml-2">
              <a
                routerLink=""
                class="p-2 bg-[#2B2D31] hover:text-gray-400 rounded-full transition-colors text-white"
              >
                <lucide-icon [img]="MessageCircle" class="w-5 h-5 fill-current" />
              </a>
              <a
                class="p-2 bg-[#2B2D31] hover:text-gray-400 rounded-full transition-colors text-white"
              >
                <lucide-icon [img]="EllipsisVertical" class="w-5 h-5" />
              </a>
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

  private router = inject(Router);

  routerUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  currentRoute = computed(() => this.routerUrl());

  friends = input<UserProps[]>([]);

  search = signal<string>('');

  filteredfriends = computed(() =>
    this.friends().filter((user) =>
      user.username.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );
}
