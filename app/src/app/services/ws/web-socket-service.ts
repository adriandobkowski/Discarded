import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry, share } from 'rxjs';
import { ExtendedMessageProps } from '../../types';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$?: WebSocketSubject<ExtendedMessageProps>;

  messages$!: Observable<ExtendedMessageProps>;

  connect(id: string): void {
    if (this.socket$) return;

    this.socket$ = webSocket<ExtendedMessageProps>({
      url: `wss://example.com/chat/${id}`,
      openObserver: {
        next: () => console.log('WS connected'),
      },
      closeObserver: {
        next: () => {
          console.log('WS closed');
          this.socket$ = undefined;
        },
      },
    });

    this.messages$ = this.socket$.pipe(retry({ delay: 3000 }), share());
  }

  send(msg: ExtendedMessageProps): void {
    this.socket$?.next(msg);
  }

  disconnect(): void {
    this.socket$?.complete();
    this.socket$ = undefined;
  }
}
