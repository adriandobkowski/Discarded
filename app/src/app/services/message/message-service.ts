import { ElementRef, Injectable, signal, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('bottomAnchor') private bottomAnchor?: ElementRef<HTMLDivElement>;

  stickToBottom = signal<boolean>(true);
  private readonly bottomThresholdPx = 48;

  onScroll(): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    this.stickToBottom.set(distanceFromBottom <= this.bottomThresholdPx);
  }

  scrollToBottom(smooth: boolean): void {
    const anchor = this.bottomAnchor?.nativeElement;
    if (anchor) {
      anchor.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end' });
      return;
    }

    const container = this.scrollContainer?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
