import { Component } from '@angular/core';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { ChatSection } from '../../section/chat-section/chat-section';
import { Navbar } from '../../navbar/navbar/navbar';
import { Message } from '../../main/message/message';
import { ProfileFooter } from '../../footer/profile-footer/profile-footer';

@Component({
  selector: 'app-root-layout',
  imports: [ChannelSection, ChatSection, Navbar, Message, ProfileFooter],
  template: `
    <app-navbar />
    <div>
      <div class="flex h-screen">
        <app-channel-section />
        <app-chat-section />
      </div>
      <app-profile-footer />
    </div>
    <app-message />
  `,
  styleUrl: './root-layout.scss',
})
export class RootLayout {}
