import { Component, inject, input } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { Status, UserProps } from '../../../types';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ContactRound, Plus } from 'lucide-angular';
import { AddFriendService } from '../../../services/friends/add-friend-service';
import { AddFriend } from '../../friends/add-friend/add-friend';
interface ChatProps {
  id: string;
  status?: Status;
  users: UserProps[];
}

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [ProfileImage, RouterLink, LucideAngularModule, AddFriend],
  template: `
    <section
      class="fixed left-16 top-12 w-48 h-full bg-slate-950 text-white flex flex-col overflow-hidden border-t border-l border-slate-700"
    >
      <header class="p-2 border-b border-slate-700">
        <input
          type="text"
          placeholder="Find or start a conversation"
          class="w-full px-3 py-2 bg-slate-700 text-white rounded text-sm placeholder-slate-400 focus:outline-none focus:bg-slate-600 focus:ring-2 focus:ring-blue-500"
        />
      </header>

      <nav class="flex items-center gap-3 px-4 py-2 border-b border-slate-700">
        <lucide-icon [img]="ContactRound" class="w-8 h-8 rounded-full " />
        <div class="font-semibold text-sm">Friends</div>
      </nav>

      <div class="flex flex-col flex-1 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <div class="text-xs font-bold text-slate-400  tracking-wide">Private messages</div>
          <button
            class="p-2 hover:bg-slate-700 rounded transition-colors"
            (click)="isOpen.set(!isOpen())"
          >
            <lucide-icon [img]="Plus" class="w-4 h-4 text-slate-400 hover:text-white"></lucide-icon>
          </button>
        </div>

        <main class="flex-1 overflow-y-auto">
          @for (chat of chats(); track chat.id) {
            <a
              [routerLink]="['messages', chat.id]"
              class="flex items-center gap-3 px-3 py-2 hover:bg-slate-700 cursor-pointer transition-colors border-b border-slate-700/50 group"
            >
              <div class="flex-1 flex items-center gap-3 min-w-0">
                @for (user of chat.users; track user.username) {
                  <app-profile-image [src]="user.img" [status]="chat.status" />
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-white truncate group-hover:text-slate-100">
                      {{ user.username }}
                    </div>
                    @if (chat.users.length > 1) {
                      <div class="text-xs text-slate-400">{{ chat.users.length }} members</div>
                    }
                  </div>
                }
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

  chats = input<ChatProps[]>([]);

  isArray = Array.isArray;
}
