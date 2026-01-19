import { Component, effect, inject } from '@angular/core';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { ChannelService } from '../../../services/channel/channel-service';
import { UserProps } from '../../../types';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-channel-aside',
  standalone: true,
  imports: [ProfileImageComponent],
  templateUrl: './channel-aside.html',
  styleUrl: './channel-aside.scss',
})
export class ChannelAsideComponent {
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);

  protected channelUsers = this.channelService.channelUsers;

  protected activeChannelUsers = this.channelService.activeChannelUsers;
  protected busyChannelUsers = this.channelService.busyChannelUsers;
  protected inactiveChannelUsers = this.channelService.inactiveChannelUsers;

  protected currentChannel = this.channelService.currentChannel;

  public constructor() {
    effect(() => {
      this.channelService.findChannelUsers().subscribe({
        next: (response: UserProps[]) => {
          this.channelUsers.set(response);
        },
        error: (err) => {
          this.toastService.errorFrom(err, 'Could not load channel users', 'Error');
        },
      });
    });
  }
}
