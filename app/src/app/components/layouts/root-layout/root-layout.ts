import { Component, computed, inject } from '@angular/core';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { ChatSection } from '../../section/chat-section/chat-section';
import { Navbar } from '../../navbar/navbar/navbar';
import { Message } from '../../main/message/message';
import { ProfileFooter } from '../../footer/profile-footer/profile-footer';
import { ChatNavbar } from '../../navbar/chat-navbar/chat-navbar';
import { MessageFooter } from '../../footer/message-footer/message-footer';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ChannelAside } from '../../aside/channel-aside/channel-aside';
import { ChatAside } from '../../aside/chat-aside/chat-aside';
import { RootAside } from '../../aside/root-aside/root-aside';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { AuthService } from '../../../services/auth/auth-service';
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
    RootAside,
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
            @if (isChannel() && !isChat()) {
              <app-channel-aside />
            } @else if (isChat() && !isChannel()) {
              <app-chat-aside />
            } @else {
              <app-root-aside />
            }
          </div>
        </div>
      </div>
      <div class="flex w-48">
        <app-profile-footer [user]="user" />
      </div>
    </div>
  `,
  styleUrl: './root-layout.scss',
})
export class RootLayout {
  private router = inject(Router);
  private authService = inject(AuthService);

  user = this.authService.user()!;

  routerUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  currentRoute = computed(() => this.routerUrl());

  isChat(): boolean {
    return this.router.url.startsWith('/chats');
  }
  isChannel(): boolean {
    return this.router.url.startsWith('/channels');
  }
}
