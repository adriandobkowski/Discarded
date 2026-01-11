import { Component, inject } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { LucideAngularModule, Hash } from 'lucide-angular';

@Component({
  selector: 'app-channel-navbar',
  imports: [LucideAngularModule],
  template: `
    <nav
      class="bg-[#313338] h-12 w-full flex items-center justify-between border-b border-[#1F2023] shadow-md pl-4 pr-4"
    >
      <div class="flex items-center gap-2">
        <lucide-icon [img]="Hash" class="w-6 h-6 text-gray-400" />
        <div class="text-white font-bold text-base">{{ currentChannel()?.name }}</div>
      </div>
    </nav>
  `,
  styleUrl: './channel-navbar.scss',
})
export class ChannelNavbar {
  readonly Hash = Hash;
  private channelService = inject(ChannelService);

  currentChannel = this.channelService.currentChannel;
}
