import { Component, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Inbox, ContactRound, Settings, Handshake } from 'lucide-angular';
import { map } from 'rxjs';
import { ChannelProps } from '../../../types';
import { UserService } from '../../../services/user/user-service';

@Component({
  selector: 'app-root-header',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <header class="bg-slate-950 w-full h-12 flex items-center justify-between px-6">
      <div class="flex flex-1 items-center gap-4 justify-center">
        <lucide-icon [img]="ContactRound" class="w-10 h-10 text-white rounded-full" />
        <div class="text-white font-semibold text-lg">Friends</div>
      </div>

      <div class="relative">
        <button
          (click)="inboxActive.set(!inboxActive())"
          class="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium relative group"
        >
          <lucide-icon [img]="Inbox" class="w-5 h-5" />
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-slate-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap border border-slate-600"
          >
            Inbox
          </div>
        </button>
      </div>
    </header>
  `,
  styleUrl: './root-header.scss',
})
export class RootHeader implements OnDestroy {
  readonly Inbox = Inbox;
  readonly ContactRound = ContactRound;
  readonly Settings = Settings;
  readonly Handshake = Handshake;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  activeElement: string = '';
  friendRequests: number | null = 5;
  channel: ChannelProps | null = null;

  inboxActive = this.userService.inboxActive;

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
  ngOnDestroy(): void {
    this.inboxActive.set(false);
  }
}
