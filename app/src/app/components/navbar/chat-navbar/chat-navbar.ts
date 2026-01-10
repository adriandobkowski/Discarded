import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  LucideAngularModule,
  ContactRound,
  MessageCirclePlus,
  Phone,
  Search,
} from 'lucide-angular';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { ChannelProps, UserProps } from '../../../types';
import { AddFriend } from '../../friends/add-friend/add-friend';
import { AddFriendService } from '../../../services/friends/add-friend-service';
@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, ProfileImage, AddFriend],
  template: `
    <nav
      class="bg-[#313338] h-12 w-full flex items-center justify-between border-b border-[#1F2023] shadow-md pl-4 pr-4"
    >
      @if (!id()) {
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
                routerLink="active"
                routerLinkActive="bg-[#3F4147] text-white"
                class="px-3 py-1 hover:bg-[#35373C] text-gray-300 hover:text-gray-100 rounded transition-colors text-sm font-medium"
              >
                Active
              </a>
              <a
                routerLink="all"
                routerLinkActive="bg-[#3F4147] text-white"
                class="px-3 py-1 hover:bg-[#35373C] text-gray-300 hover:text-gray-100 rounded transition-colors text-sm font-medium"
              >
                All
              </a>

              <a
                routerLink="add-friend"
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
      } @else {
        @if (foundChannel()) {
          <div>
            <div>
              <app-profile-image [src]="foundChannel()?.img" />
              <div>{{ foundChannel()?.name }}</div>
              <
            </div>
          </div>
        }
        @if (foundUser()) {
          <div>
            <div>
              <app-profile-image [src]="foundUser()?.img" />
              <div>{{ foundUser()?.username }}</div>
              <
            </div>
            <div>
              <div>
                <label for="">
                  <lucide-icon [img]="Phone" />
                </label>
              </div>
              <div>
                <input type="text" placeholder="Search {{ foundUser()?.username }}" />
                <lucide-icon [img]="Search" />
              </div>
            </div>
          </div>
        }
      }
      @if (isOpen()) {
        <app-add-friend />
      }
    </nav>
  `,
  styleUrl: './chat-navbar.scss',
})
export class ChatNavbar {
  readonly ContactRound = ContactRound;
  readonly MessageCirclePlus = MessageCirclePlus;
  readonly Phone = Phone;
  readonly Search = Search;

  private route = inject(ActivatedRoute);
  private addFriendService = inject(AddFriendService);
  // private chatNavbarService = inject(ChatNavbarService);

  foundChannel = input<ChannelProps>();
  foundUser = input<UserProps>();

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  isOpen = this.addFriendService.isOpen;
}
