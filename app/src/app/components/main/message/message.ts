import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { DatePipe } from '@angular/common';
import { ExtendedMessageProps } from '../../../types/message';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileImageComponent, DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.scss',
  host: {
    class: 'overflow-auto',
  },
})
export class MessageComponent implements OnChanges {
  @ViewChild('scrollContainer') protected scrollContainer!: ElementRef;

  @Input() public messages: ExtendedMessageProps[] = [];

  protected scrollToBottom(): void {
    const el = this.scrollContainer.nativeElement as HTMLElement;
    el.scrollTop = el.scrollHeight;
  }

  public ngOnChanges(): void {
    queueMicrotask(() => this.scrollToBottom());
  }
}
