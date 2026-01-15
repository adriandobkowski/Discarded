import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat/chat-service';
import { ExtendedMessageProps } from '../../../types';
import { MessageService } from '../../../services/message/message-service';
import { Message } from '../message/message';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, interval, map, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import isEqual from 'lodash/isEqual'
@Component({
  selector: 'app-chat-message',
  imports: [Message],
  template: `<app-message [messages]="messages" />`,
  styleUrl: './chat-message.scss',
})
export class ChatMessage implements OnInit , OnDestroy{
  private chatService = inject(ChatService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);

  stickToBottom = this.messageService.stickToBottom;

  chatId = this.chatService.chatId

  destroy$ = new Subject<void>()

  messages: ExtendedMessageProps[] = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter(Boolean),
        switchMap((chatId) => {
          this.chatId.set(chatId)
          return interval(2000).pipe(
            startWith(0),
            switchMap(() => this.chatService.findMessagesByChatId()),
            distinctUntilChanged((previous, current)=> isEqual(previous, current)),
            takeUntil(this.destroy$)
          
          )
        }),
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
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
