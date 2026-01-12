import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat/chat-service';
import { ExtendedMessageProps } from '../../../types';
import { MessageService } from '../../../services/message/message-service';
import { Message } from '../message/message';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat-message',
  imports: [Message],
  template: `<app-message [messages]="messages" />`,
  styleUrl: './chat-message.scss',
})
export class ChatMessage implements OnInit {
  private chatService = inject(ChatService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);

  stickToBottom = this.messageService.stickToBottom;

  messages: ExtendedMessageProps[] = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter(Boolean),
        switchMap((chatId) => this.chatService.findMessagesByChatId(chatId)),
      )
      .subscribe({
        next: (response: ExtendedMessageProps[]) => {
          this.messages = response;
          queueMicrotask(() => {
            if (this.stickToBottom()) {
              this.messageService.scrollToBottom(false);
            }
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
