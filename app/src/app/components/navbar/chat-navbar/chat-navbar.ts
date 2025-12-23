import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LucideAngularModule, ContactRound, MessageCircle } from 'lucide-angular';

@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <nav
      class="bg-slate-800 h-16 flex items-center justify-between px-6 border-b border-slate-700 w-screen border-t"
    >
      @if (!id()) {
        <div class="flex items-center gap-6 w-full">
          <div class="flex items-center gap-3">
            <lucide-icon [img]="ContactRound" class="w-8 h-8 rounded-full text-white" />
            <div class="text-white font-semibold text-lg">Friends</div>
          </div>
          <div class="flex justify-between w-full">
            <div class="flex items-center gap-2">
              <button
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
              >
                Active
              </button>
              <button
                class="px-4 py-2 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors text-sm font-medium"
              >
                All
              </button>
              <button
                class="px-4 py-2 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors text-sm font-medium"
              >
                Add friend
              </button>
            </div>
            <button>
              <lucide-icon [img]="MessageCircle" class="text-white" />
            </button>
          </div>
        </div>
      } @else {}
    </nav>
  `,
  styleUrl: './chat-navbar.scss',
})
export class ChatNavbar {
  readonly ContactRound = ContactRound;
  readonly MessageCircle = MessageCircle;
  private route = inject(ActivatedRoute);

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
}
