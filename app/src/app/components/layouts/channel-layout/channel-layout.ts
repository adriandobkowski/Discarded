import { Component, inject, OnInit } from '@angular/core';
import { ChannelHeaderComponent } from '../../header/channel-header/channel-header';
import { ChannelSectionComponent } from '../../section/channel-section/channel-section';
import { PrivateChannelSectionComponent } from '../../section/private-channel-section/private-channel-section';
import { ChannelNavbarComponent } from '../../navbar/channel-navbar/channel-navbar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChannelAsideComponent } from '../../aside/channel-aside/channel-aside';
import { ProfileFooterComponent } from '../../footer/profile-footer/profile-footer';
import { MessageFooterComponent } from '../../footer/message-footer/message-footer';
import { ChannelService } from '../../../services/channel/channel-service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-channel-layout',
  standalone: true,
  imports: [
    ChannelHeaderComponent,
    ChannelSectionComponent,
    PrivateChannelSectionComponent,
    ChannelNavbarComponent,
    RouterOutlet,
    ChannelAsideComponent,
    ProfileFooterComponent,
    MessageFooterComponent,
  ],
  templateUrl: './channel-layout.html',
  styleUrl: './channel-layout.scss',
})
export class ChannelLayoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);
  protected currentChannel = this.channelService.currentChannel;

  protected channelId = this.channelService.channelId;

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.channelId.set(id);
      this.channelService.findById().subscribe({
        next: (channel) => this.currentChannel.set(channel),
        error: (err) => this.toastService.errorFrom(err, 'Could not load channel', 'Error'),
      });
    });
  }
}
