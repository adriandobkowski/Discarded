import { Component, effect, inject } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { ChannelService } from '../../../services/channel/channel-service';
import { UserProps } from '../../../types';

@Component({
  selector: 'app-channel-aside',
  standalone: true,
  imports: [ProfileImage],
  template: `
    <div class="flex flex-col gap-6 py-4">
      <div>
        <div class="text-slate-400 text-xs uppercase tracking-wide font-semibold px-4 mb-3">
          Active - {{ activeChannelUsers().length }}
        </div>
        <div class="flex flex-col gap-2 px-2">
          @for (user of activeChannelUsers(); track user.id) {
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
          Busy - {{ busyChannelUsers().length }}
        </div>
        <div class="flex flex-col gap-2 px-2">
          @for (user of busyChannelUsers(); track user.id) {
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
          Inactive - {{ inactiveChannelUsers().length }}
        </div>
        <div class="flex flex-col gap-2 px-2">
          @for (user of inactiveChannelUsers(); track user.id) {
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
  private channelService = inject(ChannelService);

  channelUsers = this.channelService.channelUsers;

  activeChannelUsers = this.channelService.activeChannelUsers;
  busyChannelUsers = this.channelService.busyChannelUsers;
  inactiveChannelUsers = this.channelService.inactiveChannelUsers;

  currentChannel = this.channelService.currentChannel;

  constructor() {
    effect(() => {
      const currentChatId = this.currentChannel()?.id;
      if (currentChatId) {
        this.channelService.findChannelUsers(this.currentChannel()!.id).subscribe({
          next: (response: UserProps[]) => {
            this.channelUsers.set(response);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
