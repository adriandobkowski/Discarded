import { Component, effect, inject, OnInit } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import {
  ArrowUp,
  ArrowDown,
  LucideAngularModule,
  UserRoundPlus,
  Volume2,
  Hash,
} from 'lucide-angular';
import { RoomProps } from '../../../types';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { RoomService } from '../../../services/room/room-service';
@Component({
  selector: 'app-private-channel-section',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  template: `
    <section
      class="fixed left-16 top-12 w-48 h-full bg-[#2B2D31] text-gray-300 flex flex-col overflow-hidden border-t border-[#1F2023]"
    >
      <nav
        class="h-12 px-4 border-b border-[#1F2023] shadow-sm flex items-center justify-between transition-colors"
      >
        <button
          class="flex justify-center items-center gap-2 text-gray-400 hover:text-white transition-colors"
          (click)="navbarClicked = !navbarClicked"
        >
          <div class="truncate">{{ currentChannel()?.name }}</div>
          @if (navbarClicked) {
            <lucide-icon [img]="ArrowUp" class="w-5 h-5 flex-shrink-0" />
          } @else {
            <lucide-icon [img]="ArrowDown" class="w-5 h-5 flex-shrink-0" />
          }
        </button>
        <button
          class="text-gray-400 hover:text-white transition-colors"
          (click)="inviteToChannelModalActive.set(!inviteToChannelModalActive())"
        >
          <lucide-icon [img]="UserRoundPlus" class="w-5 h-5" />
        </button>
      </nav>

      <main class="flex-1 overflow-y-auto px-2 pt-3">
        @for (room of this.rooms; track room.id) {
          <a
            [routerLink]="['/channels', currentChannel()?.id, 'rooms', room.id]"
            class="group relative flex items-center justify-between px-4 py-[6px] rounded hover:bg-[#35373C] hover:text-gray-100 cursor-pointer text-gray-400 transition-all mb-[1px]"
            routerLinkActive="bg-[#35373C] text-gray-100 before:content-[''] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:rounded-full before:bg-[#5865F2] [&_.room-icon]:text-gray-300"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <div class="flex items-center gap-2 min-w-0 overflow-hidden">
              @if (room.type === 'text') {
                <lucide-icon
                  [img]="Hash"
                  class="room-icon w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300 stroke-[2.5px]"
                />
              } @else if (room.type === 'voice') {
                <lucide-icon
                  [img]="Volume2"
                  class="room-icon w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300 stroke-[2.5px]"
                />
              }
              <span class="font-medium truncate group-hover:text-gray-200">{{ room.name }}</span>
            </div>
          </a>
        }
      </main>
    </section>
  `,
  styleUrl: './private-channel-section.scss',
})
export class PrivateChannelSection implements OnInit {
  readonly ArrowUp = ArrowUp;
  readonly ArrowDown = ArrowDown;
  readonly UserRoundPlus = UserRoundPlus;
  readonly Volume2 = Volume2;
  readonly Hash = Hash;

  private channelService = inject(ChannelService);

  private roomService = inject(RoomService);

  currentChannel = this.channelService.currentChannel;

  rooms: RoomProps[] = [];

  navbarClicked: boolean = false;

  inviteToChannelModalActive = this.channelService.inviteToChannelModalActive;

  ngOnInit(): void {
    console.log(this.currentChannel());
    this.roomService.findRoomsByChannelId(this.channelId()!).subscribe({
      next: (response: RoomProps[]) => {
        this.rooms = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
