import { Component, inject } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { ProfileImage } from '../../profile/profile-image/profile-image';

@Component({
  selector: 'app-channel-header',
  imports: [ProfileImage],
  template: `
    <header class="bg-slate-950 w-full h-12 flex items-center justify-center gap-4 px-6">
      <app-profile-image [src]="currentChannel()?.img" class="w-10 h-10 text-white rounded-full" />
      <div class="text-white font-semibold text-lg">{{ currentChannel()?.name }}</div>
    </header>
  `,
  styleUrl: './channel-header.scss',
})
export class ChannelHeader {
  private channelService = inject(ChannelService);

  currentChannel = this.channelService.currentChannel;
}
