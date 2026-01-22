import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room/room-service';
import { ActivatedRoute } from '@angular/router';
import { ExtendedMessageProps } from '../../../types/message';
import { MessageComponent } from '../message/message';
import {
  distinctUntilChanged,
  filter,
  interval,
  map,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-room-message',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './room-message.html',
  styleUrl: './room-message.scss',
})
export class RoomMessageComponent implements OnInit, OnDestroy {
  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);

  public roomId = this.roomService.roomId;

  protected destroy$ = new Subject<void>();

  protected messages: ExtendedMessageProps[] = [];

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('roomId')),
        filter(Boolean),
        switchMap((roomId) => {
          this.roomId.set(roomId);

          return interval(2000).pipe(
            startWith(0),
            switchMap(() => this.roomService.findMessagesByRoomId()),
            distinctUntilChanged((previous, current) => isEqual(previous, current)),
            takeUntil(this.destroy$),
          );
        }),
      )
      .subscribe((messages: ExtendedMessageProps[]) => {
        this.messages = messages;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.roomId.set(null);
  }
}
