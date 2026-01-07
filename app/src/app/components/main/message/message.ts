import { Component } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { DatePipe } from '@angular/common';
import { MessageProps } from '../../../types';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileImage, DatePipe],
  template: `
    <div class="flex flex-col gap-0 h-full w-4xl overflow-y-auto border-none">
      @if (messages.length === 0) {
        <div class="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div class="w-16 h-16">
            <app-profile-image [src]="user?.img" />
          </div>
          <h2 class="text-xl font-semibold text-white">{{ user?.username }}</h2>
          <span class="text-slate-400 text-sm"
            >That's the beginning of your chat with {{ user?.username }}!</span
          >
        </div>
      } @else {
        @for (message of messages; track message.id) {
          <div
            class="group border-b border-slate-700 hover:bg-slate-700/50 transition-colors py-2 px-4"
          >
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <!-- <app-profile-image [src]="message.user.img" /> -->
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-2 mb-1">
                  <!-- <span class="font-semibold text-white text-sm">{{ message.user.username }}</span> -->
                  <span
                    class="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {{ message.createdAt | date: 'short' }}
                  </span>
                </div>

                <div class="text-slate-200 text-sm break-words">
                  {{ message.message }}
                </div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styleUrl: './message.scss',
})
export class Message {
  messages: MessageProps[] = [];
  user: UserProps | null = null;

  onInit(): void {
    // this.messages =
  }
}
