import { Component, computed, inject, OnInit } from '@angular/core';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { ChatSection } from '../../section/chat-section/chat-section';
import { Navbar } from '../../navbar/navbar/navbar';
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
import { UserService } from '../../../services/user/user-service';
import { ChannelProps, ExtendedChatProps } from '../../../types';
import { ChannelService } from '../../../services/channel/channel-service';
import { PrivateChannelSection } from '../../section/private-channel-section/private-channel-section';
@Component({
  selector: 'app-root-layout',
  imports: [
    ChannelSection,
    ChatSection,
    Navbar,
    RouterOutlet,
    ProfileFooter,
    ChatNavbar,
    MessageFooter,
    ChannelAside,
    ChatAside,
    RootAside,
    PrivateChannelSection,
  ],
  template: `
    <div class="w-screen h-screen flex flex-col bg-[#313338] text-gray-100 font-sans">
      <app-navbar />
      <div class="flex flex-1">
        <app-channel-section [channels]="channels" />
        <div class="flex flex-col flex-1">
          <app-chat-navbar />
          <div class="flex flex-1 overflow-hidden">
            @if (!isChannel()) {
              <app-chat-section [chattedWithFriends]="chattedWithFriends" />
            } @else {
              <app-private-channel-section />
            }
            <main class="flex flex-col flex-1 h-full pl-64 min-w-0 bg-[#313338]">
              @if (isChannel() || isChat()) {
                <router-outlet class="h-full" />
                <app-message-footer />
              } @else {
                <router-outlet />
              }
            </main>
            @if (isChannel() && !isChat()) {
              <app-channel-aside class="w-60 flex-shrink-0 bg-[#2B2D31]" />
            } @else if (isChat() && !isChannel()) {
              <app-chat-aside class="w-60 flex-shrink-0 bg-[#2B2D31]" />
            } @else {
              <app-root-aside
                class="w-[360px] flex-shrink-0 bg-[#2B2D31] border-l border-[#26272D]"
              />
            }
          </div>
        </div>
      </div>
      <div>
        <app-profile-footer />
      </div>
    </div>
  `,
  styleUrl: './root-layout.scss',
})
export class RootLayout implements OnInit {
  private router = inject(Router);

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private channelService = inject(ChannelService);

  user = this.authService.user;

  chattedWithFriends: ExtendedChatProps[] = [];
  channels: ChannelProps[] = [];

  routerUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  currentRoute = computed(() => this.routerUrl());

  ngOnInit(): void {
    if (this.isChannel() && !this.isRoom()) {
      this.channelService.messageDisabled.set(true);
    } else {
      this.channelService.messageDisabled.set(false);
    }

    this.userService.findChattedWithUsers().subscribe({
      next: (response: ExtendedChatProps[]) => {
        this.chattedWithFriends = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.channelService.findAll().subscribe({
      next: (response: ChannelProps[]) => {
        this.channels = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isChat(): boolean {
    return this.router.url.startsWith('/chats');
  }
  isChannel(): boolean {
    return this.router.url.startsWith('/channels');
  }
  isRoom(): boolean {
    return this.router.url.startsWith('/channels');
  }
}
