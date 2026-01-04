import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Inbox, ContactRound, Settings } from 'lucide-angular';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <nav class="bg-slate-950 w-full h-12 flex items-center justify-between px-6">
      @if (!id()) {
        <div class="flex flex-1 items-center gap-4 justify-center">
          <lucide-icon [img]="ContactRound" class="w-10 h-10 text-white rounded-full" />
          <div class="text-white font-semibold text-lg">Friends</div>
        </div>
      } @else {}

      <div class="relative">
        <button
          (click)="inboxActive = !inboxActive"
          class="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium relative group"
        >
          <lucide-icon [img]="Inbox" class="w-5 h-5" />
          @if (friendRequests && friendRequests > 0) {
            <span class="ml-2 px-2 py-1 bg-red-600 rounded-full text-xs font-bold text-white">
              {{ friendRequests }}
            </span>
          }
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
              <a [routerLink]="['invitations']" class="relative">
                <img src="" alt="" class="w-6 h-6 hover:opacity-80 transition-opacity" />
                @if (friendRequests && friendRequests > 0) {
                  <div
                    class="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  >
                    {{ friendRequests > 99 ? '99+' : friendRequests }}
                  </div>
                }
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
    </nav>
  `,
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly Inbox = Inbox;
  readonly ContactRound = ContactRound;
  readonly Settings = Settings;
  activeElement: string = '';
  inboxActive: boolean = false;
  friendRequests: number | null = null;
  private route = inject(ActivatedRoute);

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
}
