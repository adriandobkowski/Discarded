import { Component, inject, input } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { Check, X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { AddFriendService } from '../../../services/friends/add-friend-service';
@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [ProfileImage, LucideAngularModule],
  template: `
    <div class="modal-overlay">
      <form class="modal-content">
        <nav class="modal-header">
          <h2 class="text-white font-semibold text-lg">Pick friends</h2>
          <button
            type="button"
            (click)="this.addFriendService.isOpen.set(false)"
            class="modal-close"
          >
            <lucide-icon [img]="X" class="w-5 h-5" />
          </button>
        </nav>

        <div class="modal-body">
          <input type="text" placeholder="Enter friends username" class="search-input" />

          <div class="users-list">
            @for (user of users(); track user.id) {
              <div class="user-item">
                <div class="user-info">
                  <app-profile-image [src]="user?.img" />
                  <div class="user-name">{{ user.username }}</div>
                </div>
                <button
                  type="button"
                  (click)="toggleUser(user.id)"
                  [class.selected]="isSelected(user.id)"
                  class="checkbox-btn"
                >
                  @if (isSelected(user.id)) {
                    <lucide-icon [img]="Check" class="w-4 h-4" />
                  }
                </button>
              </div>
            }
          </div>
        </div>

        <footer class="modal-footer">
          <button type="button" (click)="addFriendService.isOpen.set(false)" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary">Create group</button>
        </footer>
      </form>
    </div>
  `,
  styleUrl: './add-friend.scss',
})
export class AddFriend {
  readonly Check = Check;
  readonly X = X;
  users = input<UserProps[]>();

  selectedUsers = new Set<string>();

  addFriendService = inject(AddFriendService);

  isSelected(userId: string): boolean {
    return this.selectedUsers.has(userId);
  }

  toggleUser(userId: string): void {
    if (this.selectedUsers.has(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
  }

  closeSidebar(): void {
    this.addFriendService.isOpen.set(false);
  }
}
