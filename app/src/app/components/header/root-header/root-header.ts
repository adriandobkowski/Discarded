import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Inbox, ContactRound, Settings, Handshake } from 'lucide-angular';
import { map } from 'rxjs';
import { ChannelProps } from '../../../types';

@Component({
  selector: 'app-root-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <header class="bg-slate-950 w-full h-12 flex items-center justify-between px-6">
      <div class="flex flex-1 items-center gap-4 justify-center">
        <lucide-icon [img]="ContactRound" class="w-10 h-10 text-white rounded-full" />
        <div class="text-white font-semibold text-lg">Friends</div>
      </div>

      <div class="relative">
        <button
          (click)="inboxActive = !inboxActive"
          class="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium relative group"
        >
          <lucide-icon [img]="Inbox" class="w-5 h-5" />
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-slate-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap border border-slate-600"
          >
            Inbox
          </div>
        </button>

        @if (inboxActive) {
          <div
            class="absolute right-0 mt-2 w-96 bg-slate-800 text-white rounded-lg border border-slate-700 shadow-2xl z-50"
          >
            <header class="p-4 border-b border-slate-700 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <lucide-icon [img]="Inbox" class="w-8 h-8 rounded-full bg-slate-700" />
                <h2 class="font-semibold text-lg">Inbox</h2>
              </div>
              <a
                [routerLink]="['invitations']"
                class="relative group flex items-center justify-center"
              >
                <lucide-icon
                  [img]="Handshake"
                  class="text-slate-400 hover:text-white transition-colors"
                />

                @if (friendRequests && friendRequests > 0) {
                  <div
                    class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-slate-800"
                  >
                    {{ friendRequests > 99 ? '99+' : friendRequests }}
                  </div>
                }

                <div
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
                >
                  Friend requests
                  <div
                    class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"
                  ></div>
                </div>
              </a>
            </header>

            <nav class="flex border-b border-slate-700">
              <button
                class="flex-1 px-4 py-3 hover:bg-slate-700 transition-colors text-sm font-medium border-b-2 border-blue-600"
              >
                For you
              </button>
              <button
                class="flex-1 px-4 py-3 hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                Unread messages
              </button>
              <button
                class="flex-1 px-4 py-3 hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                Tags
              </button>
            </nav>
          </div>
        }
      </div>
    </header>
  `,
  styleUrl: './root-header.scss',
})
export class RootHeader {
  readonly Inbox = Inbox;
  readonly ContactRound = ContactRound;
  readonly Settings = Settings;
  readonly Handshake = Handshake;

  private route = inject(ActivatedRoute);

  activeElement: string = '';
  inboxActive: boolean = false;
  friendRequests: number | null = 5;
  channel: ChannelProps | null = null;

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
}
