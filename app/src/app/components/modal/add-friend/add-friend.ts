import { Component, inject, input } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { Check, X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { UserService } from '../../../services/user/user-service';
@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [ProfileImage, LucideAngularModule],
  template: `
    <div class="fixed inset-0 z-2000 flex items-center justify-center bg-black/70">
      <form class="flex w-[440px] flex-col rounded bg-[#313338] shadow-2xl">
        <nav class="flex items-center justify-between px-4 py-4 shadow-sm">
          <h2 class="text-base font-semibold text-[#F2F3F5]">Pick friends</h2>
          <button
            type="button"
            (click)="userService.addFriendIsOpen.set(false)"
            class="text-[#B5BAC1] hover:text-[#DBDEE1]"
          >
            <lucide-icon [img]="X" class="h-6 w-6" />
          </button>
        </nav>

        <div class="p-4">
          <input
            type="text"
            placeholder="Enter friends username"
            class="mb-4 w-full rounded bg-[#1E1F22] p-2.5 text-[#DBDEE1] placeholder-[#87898C] outline-none"
          />

          <div class="flex max-h-[300px] flex-col gap-0.5 overflow-y-auto pr-1">
            @for (user of users(); track user.id) {
              <div
                class="group flex cursor-pointer items-center justify-between rounded px-2.5 py-2 hover:bg-[#35373C]"
                (click)="toggleUser(user.id)"
                (keydown.enter)="toggleUser(user.id)"
                tabindex="0"
              >
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 overflow-hidden rounded-full">
                    <app-profile-image [src]="user?.img" />
                  </div>
                  <div class="font-medium text-[#F2F3F5] group-hover:text-[#DBDEE1]">
                    {{ user.username }}
                  </div>
                </div>
                <button
                  type="button"
                  [class.bg-[#5865F2]]="isSelected(user.id)"
                  [class.border-[#5865F2]]="isSelected(user.id)"
                  class="flex h-5 w-5 items-center justify-center rounded border border-[#6D6F78]"
                >
                  @if (isSelected(user.id)) {
                    <lucide-icon [img]="Check" class="h-3.5 w-3.5 text-white" />
                  }
                </button>
              </div>
            }
          </div>
        </div>

        <footer class="flex justify-end gap-3 rounded-b bg-[#2B2D31] p-4">
          <button
            type="button"
            (click)="userService.addFriendIsOpen.set(false)"
            class="px-4 py-2 text-sm font-medium text-white hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded bg-[#5865F2] px-9 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4752C4]"
          >
            Create group
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class AddFriend {
  readonly Check = Check;
  readonly X = X;
  users = input<UserProps[]>();

  selectedUsers = new Set<string>();

  userService = inject(UserService);

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
}
