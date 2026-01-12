import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChannelSection } from '../../section/channel-section/channel-section';
import { ChatSection } from '../../section/chat-section/chat-section';
import { ChatService } from '../../../services/chat/chat-service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChatNavbar } from '../../navbar/chat-navbar/chat-navbar';
import { ChatHeader } from '../../header/chat-header/chat-header';
import { ProfileFooter } from '../../footer/profile-footer/profile-footer';
import { ChatAside } from '../../aside/chat-aside/chat-aside';
import { MessageFooter } from '../../footer/message-footer/message-footer';
import { filter, forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat-layout',
  imports: [
    ChannelSection,
    ChatSection,
    ChatNavbar,
    ChatHeader,
    ProfileFooter,
    RouterOutlet,
    ChatAside,
    MessageFooter,
  ],
  template: `
    <div class="w-screen h-screen flex flex-col bg-[#313338] text-gray-100 font-sans">
      <app-chat-header />
      <div class="flex flex-1">
        <app-channel-section />
        <div class="flex flex-col flex-1">
          <div class="flex flex-1 overflow-hidden">
            <app-chat-section />
            <main class="flex flex-col flex-1 h-full pl-64 min-w-0 bg-[#313338]">
              <app-chat-navbar />
              <div class="flex-1 min-h-0 overflow-hidden relative">
                <router-outlet />
              </div>
              <app-message-footer />
            </main>

            <app-chat-aside
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
  styleUrl: './chat-layout.scss',
})
export class ChatLayout implements OnInit, OnDestroy {
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route
      .firstChild!.paramMap.pipe(
        map((params) => params.get('id')),
        filter(Boolean),
        switchMap((chatId) =>
          forkJoin({
            user: this.chatService.findChattedWithUser(chatId!),
            chat: this.chatService.findChatById(chatId!),
          }),
        ),
      )
      .subscribe(({ user, chat }) => {
        this.chatService.chattedWithUser.set(user);
        this.chatService.currentChat.set(chat);
      });
  }
  ngOnDestroy(): void {
    this.chatService.chattedWithUser.set(null);
    this.chatService.currentChat.set(null);
  }
}
