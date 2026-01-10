import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, House, Plus, X, Camera } from 'lucide-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChannelProps } from '../../../types';
import { ChannelService } from '../../../services/channel/channel-service';
@Component({
  selector: 'app-channel-section',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
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
          (click)="createChannelClicked = !createChannelClicked"
        >
          <lucide-icon [img]="Plus" class="w-6 h-6 transition-colors" />
        </button>

        @if (createChannelClicked) {
          <div class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <form
              [formGroup]="channelForm"
              class="bg-[#313338] w-[440px] rounded-lg shadow-2xl overflow-hidden animate-fade-in-up"
            >
              <nav class="p-6 text-center relative">
                <h1 class="text-2xl font-bold text-white mb-2">Customize Your Server</h1>
                <p class="text-gray-400 text-sm text-center px-4">
                  Give your new server a personality with a name and an icon. You can always change
                  it later.
                </p>
                <button
                  type="button"
                  (click)="createChannelClicked = false"
                  class="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                >
                  <lucide-icon [img]="X" class="w-6 h-6" />
                </button>
              </nav>
              <div class="px-4 pb-4">
                <div class="flex justify-center mb-6">
                  <div class="relative">
                    <input type="file" id="file-input" class="hidden" />
                    <label
                      for="file-input"
                      class="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-full hover:border-gray-200 cursor-pointer overflow-hidden bg-[#2B2D31]"
                    >
                      <div
                        class="flex flex-col items-center gap-1 text-gray-400 text-xs font-bold uppercase p-2 text-center"
                      >
                        <lucide-icon [img]="Camera" class="w-6 h-6" />
                        <span>Upload</span>
                      </div>
                    </label>
                    <div
                      class="absolute -top-1 -right-1 bg-[#5865F2] rounded-full p-1 border-[3px] border-[#313338]"
                    >
                      <lucide-icon [img]="Plus" class="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label for="name" class="text-xs font-bold text-gray-400 uppercase mb-2 block"
                    >Server name</label
                  >
                  <input
                    type="text"
                    id="name"
                    formControlName="name"
                    class="w-full p-2.5 bg-[#1E1F22] text-white rounded outline-none focus:ring-2 focus:ring-[#00A8FC] font-medium"
                  />
                  <div class="text-xs text-gray-500 mt-1">
                    By creating a server, you agree to Discord's
                    <a href="#" class="text-[#00A8FC] hover:underline">Community Guidelines</a>.
                  </div>
                </div>
              </div>
              <div class="bg-[#2B2D31] p-4 flex justify-between items-center">
                <button
                  type="button"
                  (click)="createChannelClicked = false"
                  class="text-white text-sm font-medium hover:underline px-4"
                >
                  Back
                </button>
                <button
                  type="submit"
                  class="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-2.5 rounded text-sm font-medium transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './channel-section.scss',
})
export class ChannelSection implements OnInit {
  readonly House = House;
  readonly Plus = Plus;
  readonly X = X;
  readonly Camera = Camera;

  private channelService = inject(ChannelService);

  channels = this.channelService.channels();

  createChannelClicked: boolean = false;

  channelForm = new FormGroup({
    img: new FormControl<string | null>(null),
    name: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });
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
