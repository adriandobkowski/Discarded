import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat/chat-service';
import { ExtendedMessageProps } from '../../../types';
import { MessageComponent } from '../message/message';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, interval, map, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import isEqual from 'lodash/isEqual';
@Component({
  selector: 'app-chat-message',
  standalone:true,
  imports: [MessageComponent],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss',
})
export class ChatMessageComponent implements OnInit , OnDestroy{
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  protected chatId = this.chatService.chatId;

  protected destroy$ = new Subject<void>();

  protected messages: ExtendedMessageProps[] = [];

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter(Boolean),
        switchMap((chatId) => {
          this.chatId.set(chatId);
          
return interval(2000).pipe(
            startWith(0),
            switchMap(() => this.chatService.findMessagesByChatId()),
            distinctUntilChanged((previous, current)=> isEqual(previous, current)),
            takeUntil(this.destroy$)
          
          );
        }),
      )
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
