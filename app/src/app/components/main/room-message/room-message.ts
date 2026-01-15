import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room/room-service';
import { ActivatedRoute } from '@angular/router';
import { ExtendedMessageProps } from '../../../types';
import { Message } from '../message/message';
import { distinctUntilChanged, filter, interval, map, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { isEqual } from 'lodash';
import { MessageService } from '../../../services/message/message-service';

@Component({
  selector: 'app-room-message',
  imports: [Message],
  template: ` <app-message [messages]="messages" /> `,
  styleUrl: './room-message.scss',
})
export class RoomMessage implements OnInit, OnDestroy {
  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService)

  stickToBottom = this.messageService.stickToBottom;

  roomId = this.roomService.roomId

  destroy$ = new Subject<void>()

  messages: ExtendedMessageProps[] = [];


  ngOnInit(): void {
      this.route.paramMap
        .pipe(
          map((params) => params.get('roomId')),
          filter(Boolean),
          switchMap((roomId) => {
            this.roomId.set(roomId)
            return interval(2000).pipe(
              startWith(0),
              switchMap(() => this.roomService.findMessagesByRoomId()),
              distinctUntilChanged((previous, current)=> isEqual(previous, current)),
              takeUntil(this.destroy$)
            
            )
          }),
        )
        .subscribe((messages:ExtendedMessageProps[]) => {
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
