import { Component, inject, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room/room-service';
import { ActivatedRoute } from '@angular/router';
import { ExtendedMessageProps } from '../../../types';
import { Message } from '../message/message';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-room-message',
  imports: [Message],
  template: ` <app-message [messages]="messages" /> `,
  styleUrl: './room-message.scss',
})
export class RoomMessage implements OnInit {
  private roomService = inject(RoomService);

  private route = inject(ActivatedRoute);

  messages: ExtendedMessageProps[] = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('roomId')),
        filter(Boolean),
        switchMap((roomId) => this.roomService.findMessagesByRoomId(roomId)),
      )
      .subscribe({
        next: (response: ExtendedMessageProps[]) => {
          this.messages = response;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
