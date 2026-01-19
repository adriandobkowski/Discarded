import { Component, inject } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';

@Component({
  selector: 'app-channel-header',
  imports: [ProfileImageComponent],
  standalone: true,
  templateUrl: './channel-header.html',
  styleUrl: './channel-header.scss',
})
export class ChannelHeaderComponent {
  private channelService = inject(ChannelService);

  protected currentChannel = this.channelService.currentChannel;
}
