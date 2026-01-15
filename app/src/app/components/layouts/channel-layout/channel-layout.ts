import { Component, inject, OnInit } from '@angular/core';
import { ChannelHeader } from '../../header/channel-header/channel-header';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { PrivateChannelSection } from '../../section/private-channel-section/private-channel-section';
import { ChannelNavbar } from '../../navbar/channel-navbar/channel-navbar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChannelAside } from '../../aside/channel-aside/channel-aside';
import { ProfileFooter } from '../../footer/profile-footer/profile-footer';
import { MessageFooter } from '../../footer/message-footer/message-footer';
import { ChannelService } from '../../../services/channel/channel-service';
import { ChannelProps } from '../../../types';

@Component({
  selector: 'app-channel-layout',
  imports: [
    ChannelHeader,
    ChannelSection,
    PrivateChannelSection,
    ChannelNavbar,
    RouterOutlet,
    ChannelAside,
    ProfileFooter,
    MessageFooter,
  ],
  template: `
    <div class="w-screen h-screen flex flex-col bg-[#313338] text-gray-100 font-sans">
      <app-channel-header />
      <div class="flex flex-1">
        <app-channel-section />

        <div class="flex flex-col flex-1">
          <div class="flex flex-1 overflow-hidden">
            <app-private-channel-section />
            <main class="flex flex-col flex-1 h-full pl-64 min-w-0 bg-[#313338]">
              <app-channel-navbar />
              <div class="flex-1 min-h-0 overflow-hidden relative">
                <router-outlet />
              </div>
              <app-message-footer />
            </main>

            <app-channel-aside
              class="w-[360px] flex-shrink-0 bg-[#2B2D31] border-l border-[#26272D]"
            />
          </div>
        </div>
      </div>
      <div>
        <app-profile-footer />
      </div>
    </div>
  `,
  styleUrl: './channel-layout.scss',
})
export class ChannelLayout implements OnInit {
  private route = inject(ActivatedRoute);
  private channelService = inject(ChannelService);
  currentChannel = this.channelService.currentChannel;

  ngOnInit(): void {
    this.route.firstChild?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.channelService.findById(id).subscribe({
        next: (response: ChannelProps) => {
          this.currentChannel.set(response);
        },
      });
    });
  }
}
