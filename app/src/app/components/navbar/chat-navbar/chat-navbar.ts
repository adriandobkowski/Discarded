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
      class="bg-slate-800 h-16 w-screen flex items-center justify-between  border-b border-slate-700 border-t pl-64"
    >
      @if (!id()) {
        <div class="flex items-center gap-6 w-full">
          <div></div>
          <div class="flex items-center gap-3">
            <lucide-icon [img]="ContactRound" class="w-8 h-8 rounded-full text-white" />
            <div class="text-white font-semibold text-lg">Friends</div>
          </div>
          <div class="flex justify-between w-full">
            <div class="flex items-center gap-2">
              <a
                routerLink="active"
                routerLinkActive="bg-slate-700"
                class="px-4 py-2 hover:bg-slate-700 text-white rounded transition-colors text-sm font-medium"
              >
                Active
              </a>
              <a
                routerLink="all"
                routerLinkActive="bg-slate-700"
                class="px-4 py-2 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors text-sm font-medium"
              >
                All
              </a>
              <a
                routerLink="add-friend"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
              >
                Add friend
              </a>
            </div>
            <button
              class="text-slate-300 hover:text-white transition-colors mx-6 relative group"
              title="Start a new group chat"
            >
              <lucide-icon [img]="MessageCirclePlus" (click)="isOpen.set(!isOpen())" />
              <div
                class="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-slate-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap border border-slate-600 -mx-12"
              >
                Start a new group chat
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
        <app-add-friend class="absolute" />
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
