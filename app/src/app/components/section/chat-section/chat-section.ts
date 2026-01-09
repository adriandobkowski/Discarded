import { Component, inject, input } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { ExtendedChatProps } from '../../../types';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ContactRound, Plus } from 'lucide-angular';
import { AddFriendService } from '../../../services/friends/add-friend-service';
import { AddFriend } from '../../friends/add-friend/add-friend';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [ProfileImage, RouterLink, LucideAngularModule, AddFriend],
  template: `
    <section
      class="fixed left-16 top-12 w-48 h-full bg-[#2B2D31] text-gray-300 flex flex-col overflow-hidden border-t border-[#1F2023]"
    >
      <header class="p-2 border-b border-[#1F2023] shadow-sm">
        <input
          type="text"
          placeholder="Find or start a conversation"
          class="w-full px-2 py-1.5 bg-[#1E1F22] text-white rounded text-sm placeholder-gray-400 focus:outline-none transition-all"
        />
      </header>

      <nav
        class="flex items-center gap-3 px-4 py-2 hover:bg-[#35373C] hover:text-white cursor-pointer transition-colors mt-1"
      >
        <lucide-icon [img]="ContactRound" class="w-6 h-6" />
        <div class="font-medium text-sm">Friends</div>
      </nav>

      <div class="flex flex-col flex-1 overflow-hidden pt-2">
        <div class="flex items-center justify-between px-4 py-3 hover:text-gray-100 cursor-pointer">
          <div
            class="text-xs font-bold text-gray-400 uppercase tracking-wide group-hover:text-gray-200"
          >
            Private messages
          </div>
          <button class="p-1 hover:text-white transition-colors" (click)="isOpen.set(!isOpen())">
            <lucide-icon [img]="Plus" class="w-4 h-4 text-gray-400 hover:text-white"></lucide-icon>
          </button>
        </div>

        <main class="flex-1 overflow-y-auto px-2">
          @for (chat of chattedWithFriends(); track chat.chatId) {
            <a
              [routerLink]="['chats', chat.chatId]"
              class="flex items-center gap-3 px-2.5 py-2 hover:bg-[#35373C] hover:text-white cursor-pointer transition-colors rounded mb-0.5 group"
            >
              <div class="flex-1 flex items-center gap-3 min-w-0">
                <app-profile-image [src]="chat.user.img" [status]="chat.user.status" />
                <div class="flex-1 min-w-0">
                  <div class="text-md font-medium text-gray-300 truncate group-hover:text-white">
                    {{ chat.user.username }}
                  </div>
                </div>
              </div>
            </a>
          }
        </main>
      </div>
      @if (isOpen()) {
        <app-add-friend class="absolute" />
      }
    </section>
  `,
  styleUrl: './chat-section.scss',
})
export class ChatSection {
  readonly ContactRound = ContactRound;
  readonly Plus = Plus;

  private addFriendService = inject(AddFriendService);

  isOpen = this.addFriendService.isOpen;

  chattedWithFriends = input<ExtendedChatProps[]>([]);

  isArray = Array.isArray;
}
