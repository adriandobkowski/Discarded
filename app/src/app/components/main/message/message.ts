import {  AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { DatePipe } from '@angular/common';
import { ExtendedMessageProps } from '../../../types';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileImageComponent, DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class MessageComponent  implements AfterViewChecked{

  @ViewChild('scrollContainer') protected scrollContainer!: ElementRef;

  @Input() public messages: ExtendedMessageProps[] = [];

  protected scrollToBottom():void {
  const el = this.scrollContainer.nativeElement as HTMLElement;
  el.scrollTop = el.scrollHeight;
}
protected isScrolledToBottom(): boolean {
  const el = this.scrollContainer.nativeElement as HTMLElement;
  
return el.scrollHeight - el.scrollTop - el.clientHeight < 10;
}
public ngAfterViewChecked(): void {
  if (!this.isScrolledToBottom()) {
    this.scrollToBottom();

  }
}
}
