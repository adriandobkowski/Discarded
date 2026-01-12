import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { MessageProps } from '../../types';
import { retry, share } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$ = webSocket<MessageProps>('wss://example.com/chat');

  messages$ = this.socket$.pipe(retry({ delay: 3000 }), share());

  send(msg: MessageProps) {
    this.socket$.next(msg);
  }
}
