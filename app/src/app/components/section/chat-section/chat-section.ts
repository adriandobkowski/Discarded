import { Component, inject, OnInit } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ContactRound, Plus } from 'lucide-angular';
import { UserService } from '../../../services/user/user-service';
import { ChatService } from '../../../services/chat/chat-service';
import { ExtendedUserProps } from '../../../types';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [ProfileImage, RouterLink, LucideAngularModule],
  template: `
    <section
      class="fixed left-16 top-12 w-48 h-full bg-[#2B2D31] text-gray-300 flex flex-col overflow-hidden border-t border-[#1F2023]"
    >
      <header class="p-2 ">
        <input
          type="text"
          placeholder="Find or start a conversation"
          class="truncate w-full px-2 py-1.5 bg-[#1E1F22] text-white rounded text-sm placeholder-gray-400 focus:outline-none transition-all"
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
          @for (chat of chattedWithFriends; track chat.chatId) {
            <a
              [routerLink]="['/', 'chats', chat.chatId]"
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
    </section>
  `,
  styleUrl: './chat-section.scss',
})
export class ChatSection implements OnInit {
  readonly ContactRound = ContactRound;
  readonly Plus = Plus;

  private userService = inject(UserService);

  private chatService = inject(ChatService);

  chattedWithFriends = this.chatService.chattedWithUsers();
  isOpen = this.userService.addFriendIsOpen;

  isArray = Array.isArray;

  ngOnInit(): void {
    this.userService.findChattedWithUsers().subscribe({
      next: (response: ExtendedUserProps[]) => {
        this.chattedWithFriends = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
