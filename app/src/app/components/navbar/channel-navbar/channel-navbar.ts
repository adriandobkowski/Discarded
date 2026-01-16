import { Component, inject } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { LucideAngularModule, Hash } from 'lucide-angular';

@Component({
  selector: 'app-channel-navbar',
  imports: [LucideAngularModule],
  standalone:true,
  templateUrl:'./channel-navbar.html',
  styleUrl: './channel-navbar.scss',
})
export class ChannelNavbarComponent {
  protected readonly Hash = Hash;
  private channelService = inject(ChannelService);

  protected currentChannel = this.channelService.currentChannel;
}
