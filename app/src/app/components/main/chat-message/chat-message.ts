import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat/chat-service';
import { ExtendedMessageProps } from '../../../types';
import { MessageService } from '../../../services/message/message-service';
import { Message } from '../message/message';
import { ActivatedRoute } from '@angular/router';
import { filter, map, merge, scan, switchMap } from 'rxjs';
import { WebSocketService } from '../../../services/ws/web-socket-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-message',
  imports: [Message],
  template: `<app-message [messages]="messages" />`,
  styleUrl: './chat-message.scss',
})
export class ChatMessage implements OnInit {
  private chatService = inject(ChatService);
  private messageService = inject(MessageService);
  private webSocketService = inject(WebSocketService);
  private route = inject(ActivatedRoute);

  stickToBottom = this.messageService.stickToBottom;

  messages: ExtendedMessageProps[] = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(),
        map((params) => params.get('id')),
        filter(Boolean),
        switchMap((chatId) => {
          this.webSocketService.disconnect();
          this.webSocketService.connect(chatId);

          return merge(
            this.chatService.findMessagesByChatId(chatId),
            this.webSocketService.messages$.pipe(filter((msg) => msg.message.chatId === chatId)),
          );
        }),
        scan(
          (acc, curr) => (Array.isArray(curr) ? [...acc, ...curr] : [...acc, curr]),
          [] as ExtendedMessageProps[],
        ),
      )
      .subscribe((messages) => {
        this.messages = messages;

        queueMicrotask(() => {
          if (this.stickToBottom()) {
            this.messageService.scrollToBottom(false);
          }
        });
      });
  }
}
