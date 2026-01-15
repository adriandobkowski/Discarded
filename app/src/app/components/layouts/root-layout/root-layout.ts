import { Component } from '@angular/core';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { ChatSection } from '../../section/chat-section/chat-section';
import { RootHeader } from '../../header/root-header/root-header';
import { ProfileFooter } from '../../footer/profile-footer/profile-footer';
import { RouterOutlet } from '@angular/router';
import { RootAside } from '../../aside/root-aside/root-aside';
import { RootNavbar } from '../../navbar/root-navbar/root-navbar';
@Component({
  selector: 'app-root-layout',
  imports: [
    ChannelSection,
    ChatSection,
    RootHeader,
    RouterOutlet,
    ProfileFooter,
    RootAside,
    RootHeader,
    RootNavbar,
  ],
  template: `
    <div class="w-screen h-screen flex flex-col bg-[var(--app-bg)] text-[var(--app-text)] font-sans">
      <app-root-header />
      <div class="flex flex-1">
        <app-channel-section />
        <div class="flex flex-col flex-1">
          <app-root-navbar />
          <div class="flex flex-1 overflow-hidden">
            <app-chat-section />
            <main class="flex flex-col flex-1 h-full pl-64 min-w-0 bg-[var(--app-bg)]">
              <router-outlet />
            </main>

            <app-root-aside
              class="w-[360px] flex-shrink-0 bg-[var(--app-surface)] border-l border-[var(--app-border)]"
            />
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
export class RootLayout {}
