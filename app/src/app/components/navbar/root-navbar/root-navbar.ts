import { Component, inject } from '@angular/core';
import { LucideAngularModule, ContactRound, MessageCirclePlus } from 'lucide-angular';
import { AddFriend } from '../../modal/add-friend/add-friend';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user-service';

@Component({
  selector: 'app-root-navbar',
  imports: [LucideAngularModule, AddFriend, RouterLink],
  template: `
    <nav
      class="bg-[#313338] h-12 w-full flex items-center justify-between border-b border-[#1F2023] shadow-md pl-4 pr-4"
    >
      <div class="flex items-center gap-6 w-full h-full">
        <div class="flex items-center gap-3 px-2">
          <lucide-icon [img]="ContactRound" class="w-6 h-6 text-gray-400" />
          <div class="text-white font-bold text-base">Friends</div>
        </div>
        <div class="w-px h-6 bg-[#3F4147] mx-2"></div>
        <div class="flex flex-1 justify-between h-full items-center">
          <div class="flex items-center gap-2">
            <a
              routerLink="active"
              routerLinkActive="bg-[#3F4147] text-white"
              class="px-3 py-1 hover:bg-[#35373C] text-gray-300 hover:text-gray-100 rounded transition-colors text-sm font-medium"
            >
              Online
            </a>
            <a
              [routerLink]="['active']"
              routerLinkActive="bg-[#3F4147] text-white"
              class="px-3 py-1 hover:bg-[#35373C] text-gray-300 hover:text-gray-100 rounded transition-colors text-sm font-medium"
            >
              Active
            </a>
            <a
              [routerLink]="['all']"
              routerLinkActive="bg-[#3F4147] text-white"
              class="px-3 py-1 hover:bg-[#35373C] text-gray-300 hover:text-gray-100 rounded transition-colors text-sm font-medium"
            >
              All
            </a>

            <a
              [routerLink]="['add-friend']"
              class="px-3 py-1 bg-[#248046] hover:bg-[#1A6334] text-white rounded transition-colors text-sm font-bold ml-2 shadow-sm"
            >
              Add Friend
            </a>
          </div>
          <button
            class="text-gray-300 hover:text-white transition-colors mx-2 relative group p-1"
            title="Start a new group chat"
          >
            <lucide-icon
              [img]="MessageCirclePlus"
              (click)="isOpen.set(!isOpen())"
              class="w-6 h-6"
            />
            <div
              class="absolute top-full right-0 mt-2 hidden group-hover:block bg-[#111214] text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-[#1F2023] shadow-lg z-50 pointer-events-none"
            >
              New Group DM
            </div>
          </button>
        </div>
      </div>
      @if (isOpen()) {
        <app-add-friend />
      }
    </nav>
  `,
  styleUrl: './root-navbar.scss',
})
export class RootNavbar {
  readonly ContactRound = ContactRound;
  readonly MessageCirclePlus = MessageCirclePlus;

  private userService = inject(UserService);
  isOpen = this.userService.addFriendIsOpen;
}
