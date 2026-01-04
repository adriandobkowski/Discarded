import { Component, computed, signal } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';

@Component({
  selector: 'app-channel-aside',
  standalone: true,
  imports: [ProfileImage],
  template: `
    <div class="flex flex-col gap-6 py-4">
      <div>
        <div class="text-slate-400 text-xs uppercase tracking-wide font-semibold px-4 mb-3">
          Active - {{ activeUsers().length }}
        </div>
        <div class="flex flex-col gap-2 px-2">
          @for (user of activeUsers(); track user.id) {
            <div
              class="flex items-center gap-3 p-2 rounded hover:bg-slate-700/50 transition-colors cursor-pointer"
            >
              <app-profile-image [src]="user.img" />
              <div class="text-white text-sm truncate">{{ user.username }}</div>
            </div>
          }
        </div>
      </div>
      <div>
        <div class="text-slate-400 text-xs uppercase tracking-wide font-semibold px-4 mb-3">
          Busy - {{ busyUsers().length }}
        </div>
        <div class="flex flex-col gap-2 px-2">
          @for (user of busyUsers(); track user.id) {
            <div
              class="flex items-center gap-3 p-2 rounded hover:bg-slate-700/50 transition-colors cursor-pointer"
            >
              <app-profile-image [src]="user.img" />
              <div class="text-white text-sm truncate">{{ user.username }}</div>
            </div>
          }
        </div>
      </div>
      <div>
        <div class="text-slate-400 text-xs uppercase tracking-wide font-semibold px-4 mb-3">
          Inactive - {{ inactiveUsers().length }}
        </div>
        <div class="flex flex-col gap-2 px-2">
          @for (user of inactiveUsers(); track user.id) {
            <div
              class="flex items-center gap-3 p-2 rounded hover:bg-slate-700/50 transition-colors cursor-pointer"
            >
              <app-profile-image [src]="user.img" />
              <div class="text-white text-sm truncate">{{ user.username }}</div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './channel-aside.scss',
})
export class ChannelAside {
  users = signal<UserProps[]>([]);

  activeUsers = computed(() => this.users().filter((user: UserProps) => user.status === 'online'));
  busyUsers = computed(() => this.users().filter((user: UserProps) => user.status === 'busy'));
  inactiveUsers = computed(() =>
    this.users().filter((user: UserProps) => user.status === 'offline'),
  );
}
