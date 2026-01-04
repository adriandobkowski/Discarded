import { Component, inject } from '@angular/core';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { ChatSection } from '../../section/chat-section/chat-section';
import { Navbar } from '../../navbar/navbar/navbar';
import { Message } from '../../main/message/message';
import { ProfileFooter } from '../../footer/profile-footer/profile-footer';
import { ChatNavbar } from '../../navbar/chat-navbar/chat-navbar';
import { MessageFooter } from '../../footer/message-footer/message-footer';
import { Router, RouterOutlet } from '@angular/router';
import { ChannelAside } from '../../aside/channel-aside/channel-aside';
import { ChatAside } from '../../aside/chat-aside/chat-aside';

@Component({
  selector: 'app-root-layout',
  imports: [
    ChannelSection,
    ChatSection,
    Navbar,
    RouterOutlet,
    Message,
    ProfileFooter,
    ChatNavbar,
    MessageFooter,
    ChannelAside,
    ChatAside,
  ],
  template: `
    <div class="w-screen h-screen flex flex-col bg-slate-900">
      <app-navbar />
      <div class="flex flex-1">
        <app-channel-section />
        <div class="flex flex-col flex-1">
          <app-chat-navbar />
          <div class="flex flex-1">
            <app-chat-section />
            <main class="flex flex-col  border-r border-slate-700 w-5xl h-full pl-64">
              @if (!isChannel() && !isChat()) {
                <router-outlet />
              } @else {
                <app-message class="h-full" />
                <app-message-footer />
              }
            </main>
          </div>
        </div>
        @if (isChannel()) {
          <app-channel-aside />
        }
        @if (isChat()) {
          <app-chat-aside />
        }
      </div>
      <div class="flex w-48">
        <app-profile-footer />
      </div>
    </div>
  `,
  styleUrl: './root-layout.scss',
})
export class RootLayout {
  private router = inject(Router);
  isChat(): boolean {
    return this.router.url.startsWith('/chats');
  }
  isChannel(): boolean {
    return this.router.url.startsWith('/channels');
  }
}
