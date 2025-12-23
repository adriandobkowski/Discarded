import { Component } from '@angular/core';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { ChatSection } from '../../section/chat-section/chat-section';
import { Navbar } from '../../navbar/navbar/navbar';
import { Message } from '../../main/message/message';
import { ProfileFooter } from '../../footer/profile-footer/profile-footer';
import { ChatNavbar } from '../../navbar/chat-navbar/chat-navbar';

@Component({
  selector: 'app-root-layout',
  imports: [ChannelSection, ChatSection, Navbar, Message, ProfileFooter, ChatNavbar],
  template: `
    <div class="w-screen h-screen flex flex-col bg-slate-900">
      <app-navbar />
      <div class="flex flex-1">
        <app-channel-section />
        <div class="flex flex-col ">
          <app-chat-navbar />
          <app-chat-section />
          <app-message />
        </div>
      </div>
      <app-profile-footer />
    </div>
  `,
  styleUrl: './root-layout.scss',
})
export class RootLayout {}
