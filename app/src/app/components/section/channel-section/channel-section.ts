import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, House, Plus, X, Camera } from 'lucide-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
interface ChannelProps {
  id: string;
  img?: string;
  name: string;
  unreadMessages: number;
}

@Component({
  selector: 'app-channel-section',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  template: `
    <section
      class="w-16 h-full fixed top-10  bg-slate-950 flex flex-col items-center gap-2 py-3 overflow-y-auto"
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
        <button
          class="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-slate-700 hover:bg-blue-600 transition-all cursor-pointer group"
          (click)="createChannelClicked = !createChannelClicked"
        >
          <lucide-icon [img]="Plus" class="w-8 h-8 rounded-full object-cover" />
        </button>

        @if (createChannelClicked) {
          <div class="modal-overlay">
            <form [formGroup]="channelForm" class="modal-content">
              <nav class="modal-header">
                <h1 class="text-xl font-bold text-white">Personalise your own channel</h1>
                <button type="button" (click)="createChannelClicked = false" class="modal-close">
                  <lucide-icon [img]="X" class="w-5 h-5" />
                </button>
              </nav>
              <div class="modal-body">
                <div class="upload-section">
                  <input type="file" id="file-input" class="hidden" />
                  <label for="file-input" class="upload-label">
                    <lucide-icon [img]="Camera" class="w-8 h-8" />
                    <div>Upload Image</div>
                  </label>
                </div>
                <div class="form-group">
                  <label for="name" class="form-label">Server name</label>
                  <input type="text" id="name" formControlName="name" class="form-input" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn-primary">Create</button>
              </div>
            </form>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './channel-section.scss',
})
export class ChannelSection {
  readonly House = House;
  readonly Plus = Plus;
  readonly X = X;
  readonly Camera = Camera;

  channels = signal<ChannelProps[]>([]);

  createChannelClicked: boolean = false;

  channelForm = new FormGroup({
    img: new FormControl<string | null>(null),
    name: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });
}
