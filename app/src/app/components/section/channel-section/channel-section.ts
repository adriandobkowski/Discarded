import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, House, Plus } from 'lucide-angular';
import { ChannelProps } from '../../../types';
import { ChannelService } from '../../../services/channel/channel-service';
@Component({
  selector: 'app-channel-section',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <section
      class="w-16 h-full fixed top-12 bg-[#1E1F22] flex flex-col items-center gap-2 py-3 overflow-y-auto no-scrollbar "
    >
      <a
        [routerLink]="['/']"
        class="flex flex-col items-center justify-center w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] hover:bg-[#5865F2] transition-all duration-300 cursor-pointer group mb-2"
      >
        <lucide-icon
          [img]="House"
          class="w-7 h-7 text-gray-200 group-hover:text-white transition-colors"
        />
      </a>

      <div class="w-8 h-[2px] bg-[#35363C] rounded-lg mb-2"></div>

      <div class="flex flex-col gap-3 w-full items-center">
        @for (channel of channels; track channel.id) {
          <a
            [routerLink]="['/channels', channel.id]"
            class="relative group w-full flex justify-center"
          >
            <div
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2 bg-white rounded-r-full scale-0 group-hover:scale-100 transition-transform origin-left"
            ></div>

            <div
              class="flex items-center justify-center w-12 h-12 rounded-[24px] group-hover:rounded-[16px] overflow-hidden transition-all duration-300 bg-[#313338] group-hover:bg-[#5865F2]"
            >
              <img [src]="channel.img" [alt]="channel.name" class="w-full h-full object-cover" />
            </div>

            <div
              class="absolute left-full ml-4 px-3 py-2 bg-[#111214] text-gray-100 font-semibold text-sm rounded-md shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-[#1F2023]"
            >
              {{ channel.name }}
              <div
                class="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-[#111214]"
              ></div>
            </div>
          </a>
        }
        <button
          class="flex flex-col items-center justify-center w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] hover:bg-[#23A559] text-green-500 hover:text-white transition-all duration-300 cursor-pointer group"
          (click)="createChannelClicked.set(!createChannelClicked())"
        >
          <lucide-icon [img]="Plus" class="w-6 h-6 transition-colors" />
        </button>
      </div>
    </section>
  `,
  styleUrl: './channel-section.scss',
})
export class ChannelSection implements OnInit {
  readonly House = House;
  readonly Plus = Plus;

  private channelService = inject(ChannelService);

  channels = this.channelService.channels();

  createChannelClicked = this.channelService.createChannelClicked;
  ngOnInit(): void {
    this.channelService.findAll().subscribe({
      next: (response: ChannelProps[]) => {
        this.channels = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
