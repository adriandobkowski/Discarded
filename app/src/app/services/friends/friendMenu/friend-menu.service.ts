import { inject, Injectable, signal } from '@angular/core';
import { FriendService } from '../friend/friend-service.service';

@Injectable({
  providedIn: 'root',
})
export class FriendMenuService {
  private friendService = inject(FriendService);

  public activeMenuUserId = this.friendService.activeMenuUserId;

  public menuPosition = signal<{ top: string; right: string }>({ top: '0px', right: '0px' });

  public toggleMenu(userId: string, event: Event): void {
    event.stopPropagation();
    if (this.activeMenuUserId() === userId) {
      this.activeMenuUserId.set(null);

      return;
    }

    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    this.menuPosition.set({
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`,
    });
    this.activeMenuUserId.set(userId);
  }
}
