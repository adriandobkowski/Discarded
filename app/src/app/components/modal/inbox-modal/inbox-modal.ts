import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user-service';
import { Check, Inbox, LucideAngularModule, X } from 'lucide-angular';
import { UserProps } from '../../../types';

@Component({
  selector: 'app-inbox-modal',
  imports: [LucideAngularModule],
  template: `
    <div class="fixed right-6 top-14 z-50 w-[26rem] max-w-[calc(100vw-3rem)]">
      <div
        class="overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/95 text-white shadow-2xl backdrop-blur"
      >
        <header class="relative flex users-center justify-between gap-3 px-4 py-3">
          <div class="flex users-center gap-3 min-w-0">
            <div
              class="w-9 h-9 rounded-lg bg-slate-800/70 border border-slate-700 flex users-center justify-center flex-shrink-0"
            >
              <lucide-icon [img]="Inbox" class="w-5 h-5 text-slate-100" />
            </div>

            <div class="min-w-0">
              <h2 class="font-semibold leading-tight">Inbox</h2>
              <div class="text-xs text-slate-400">
                @if (friendRequests().length === 0) {
                  No pending friend requests
                } @else {
                  Friend requests
                }
              </div>
            </div>
          </div>

          <div class="relative group flex users-center gap-2 flex-shrink-0">
            @if (friendRequests().length !== 0) {
              <div
                class="min-w-6 h-6 px-2 rounded-full bg-red-500/90 border border-red-300/20 text-white text-[11px] font-bold flex users-center justify-center"
              >
                {{ friendRequests().length > 99 ? '99+' : friendRequests().length }}
              </div>
            }

            <div
              class="absolute top-full right-0 mt-2 px-2 py-1 bg-black/90 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10"
            >
              Pending friend requests
            </div>
          </div>
        </header>

        <div class="h-px bg-slate-700/60"></div>

        <section class="max-h-[60vh] overflow-auto">
          @if (friendRequests().length === 0) {
            <div class="px-4 py-6 text-center">
              <div class="text-slate-200 font-medium">All caught up</div>
              <div class="text-sm text-slate-400 mt-1">New friend requests will show up here.</div>
            </div>
          } @else {
            <div class="p-2">
              @for (user of friendRequestUsers; track user.id) {
                <div
                  class="flex users-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-slate-800/60 transition-colors"
                >
                  <div class="flex users-center gap-3 min-w-0">
                    <div class="relative flex-shrink-0">
                      @if (user?.img) {
                        <img
                          [src]="user!.img"
                          [alt]="(user?.username ?? 'User') + ' avatar'"
                          class="w-10 h-10 rounded-full object-cover border border-slate-700"
                        />
                      } @else {
                        <div
                          class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex users-center justify-center text-sm font-bold text-slate-200"
                        >
                          {{ (user?.username ?? user.id).charAt(0).toUpperCase() }}
                        </div>
                      }

                      <span
                        class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-slate-900"
                        [class.bg-emerald-400]="user?.status === 'online'"
                        [class.bg-amber-400]="user?.status === 'busy'"
                        [class.bg-slate-500]="user?.status === 'offline'"
                      ></span>
                    </div>

                    <div class="min-w-0">
                      <div
                        class="text-sm font-semibold truncate"
                        [title]="user?.username ?? user.id"
                      >
                        {{ user?.username ?? user.id }}
                      </div>
                      <div class="text-xs text-slate-400 truncate">
                        @if (user) {
                          {{ user.email }}
                        } @else {
                          Loading user...
                        }
                      </div>
                    </div>
                  </div>

                  <div class="flex users-center gap-2 flex-shrink-0">
                    <span
                      class="text-[11px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 capitalize"
                    >
                      {{ user?.status ?? 'offline' }}
                    </span>

                    <button
                      type="button"
                      (click)="accept(user.id)"
                      class="w-8 h-8 rounded-md bg-emerald-500/15 border border-emerald-400/20 hover:bg-emerald-500/25 transition-colors flex users-center justify-center"
                      title="Accept"
                    >
                      <lucide-icon [img]="Check" class="w-4 h-4 text-emerald-200" />
                    </button>

                    <button
                      type="button"
                      (click)="deny(user.id)"
                      class="w-8 h-8 rounded-md bg-red-500/15 border border-red-400/20 hover:bg-red-500/25 transition-colors flex users-center justify-center"
                      title="Deny"
                    >
                      <lucide-icon [img]="X" class="w-4 h-4 text-red-200" />
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </section>
      </div>
    </div>
  `,
  styleUrl: './inbox-modal.scss',
})
export class InboxModal implements OnInit {
  readonly Inbox = Inbox;
  readonly Check = Check;
  readonly X = X;

  private userService = inject(UserService);

  friendRequests = this.userService.friendRequests;

  friendRequestUsers: UserProps[] = [];

  ngOnInit(): void {
    this.userService.findUsersByFriendRequests(this.friendRequests()).subscribe({
      next: (response: UserProps[]) => {
        this.friendRequestUsers = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  accept(friendId: string): void {
    this.userService.acceptFriendRequest(friendId).subscribe({
      error: (err) => console.log(err),
    });
  }

  deny(friendId: string): void {
    this.userService.denyFriendRequest(friendId).subscribe({
      next: () => {
        this.friendRequests.update((requests) => requests.filter((id) => id !== friendId));
      },
      error: (err) => console.log(err),
    });
  }
}
