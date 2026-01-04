import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddFriendService {
  isOpen = signal<boolean>(false);
}
