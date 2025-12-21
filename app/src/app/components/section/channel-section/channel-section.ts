import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, House } from 'lucide-angular';

interface ChannelProps {
  id: string;
  img?: string;
  name: string;
  unreadMessages: number;
}

@Component({
  selector: 'app-channel-section',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <section
      class="w-16 h-full bg-slate-950 flex flex-col items-center gap-2 py-3 border-r border-slate-700 overflow-y-auto"
    >
      <a
        [routerLink]="['/']"
        class="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-slate-700 hover:bg-blue-600 transition-all cursor-pointer group"
      >
        <lucide-icon [img]="House" class="w-8 h-8 rounded-full object-cover" />
      </a>

      <div class="w-8 h-px bg-slate-700"></div>

      <div class="flex flex-col gap-2 w-full items-center">
        @for (channel of channels(); track channel.id) {
          <a [routerLink]="['channels', channel.id]" class="relative group">
            <div
              class="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700 hover:rounded-2xl hover:bg-blue-600 transition-all cursor-pointer overflow-hidden"
            >
              <img src="" alt="" class="w-8 h-8 rounded-full object-cover" />

              @if (channel.unreadMessages > 0) {
                <div
                  class="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  {{ channel.unreadMessages > 99 ? '99+' : channel.unreadMessages }}
                </div>
              }
            </div>

            <div
              class="absolute left-full ml-3 px-3 py-2 bg-slate-950 text-white text-sm rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
            >
              {{ channel.name }}
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styleUrl: './channel-section.scss',
})
export class ChannelSection {
  readonly House = House;
  channels = signal<ChannelProps[]>([]);
}
