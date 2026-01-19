import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChannelSectionComponent } from '../../section/channel-section/channel-section';
import { ChatSectionComponent } from '../../section/chat-section/chat-section';
import { ChatService } from '../../../services/chat/chat-service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChatNavbarComponent } from '../../navbar/chat-navbar/chat-navbar';
import { ChatHeaderComponent } from '../../header/chat-header/chat-header';
import { ProfileFooterComponent } from '../../footer/profile-footer/profile-footer';
import { ChatAsideComponent } from '../../aside/chat-aside/chat-aside';
import { MessageFooterComponent } from '../../footer/message-footer/message-footer';
import { filter, forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat-layout',
  imports: [
    ChannelSectionComponent,
    ChatSectionComponent,
    ChatNavbarComponent,
    ChatHeaderComponent,
    ProfileFooterComponent,
    RouterOutlet,
    ChatAsideComponent,
    MessageFooterComponent,
  ],
  templateUrl: './chat-layout.html',
  styleUrl: './chat-layout.scss',
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  protected chatId = this.chatService.chatId;

  public ngOnInit(): void {
    this.route
      .firstChild!.paramMap.pipe(
        map((params) => params.get('id')),
        filter(Boolean),
        switchMap((chatId) => {
          this.chatId.set(chatId);

          return forkJoin({
            user: this.chatService.findChattedWithUser(),
            chat: this.chatService.findChatById(),
          });
        }),
      )
      .subscribe(({ user, chat }) => {
        this.chatService.chattedWithUser.set(user);
        this.chatService.currentChat.set(chat);
      });
  }
  public ngOnDestroy(): void {
    this.chatService.chattedWithUser.set(null);
    this.chatService.currentChat.set(null);
  }
}
