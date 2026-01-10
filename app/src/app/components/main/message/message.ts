import { Component, inject } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { DatePipe } from '@angular/common';
import { MessageProps } from '../../../types';
import { ChatService } from '../../../services/chat/chat-service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileImage, DatePipe],
  template: `
    <div class="flex flex-col gap-0 h-full w-full overflow-y-auto no-scrollbar pt-4">
      @if (messages.length === 0) {
        <div class="flex flex-col items-start justify-end gap-2 px-4 pb-4 mt-auto min-h-[50%]">
          <div class=" mb-2">
            <app-profile-image [src]="chattedWithUser()?.img" />
          </div>
          <h2 class="text-3xl font-bold text-white">{{ chattedWithUser()?.username }}</h2>
          <div class="text-gray-400 text-base">
            This is the beginning of your direct message history with
            <span class="font-semibold">{{ chattedWithUser()?.username }}</span
            >.
          </div>
        </div>
      } @else {
        @for (message of messages; track message.id) {
          <div class="group hover:bg-[#2e3035] transition-colors py-0.5 px-4 mt-[17px] first:mt-0">
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-slate-600 rounded-full cursor-pointer hover:opacity-80 transition-opacity mt-0.5"
              ></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="font-medium text-white text-base hover:underline cursor-pointer"
                    >User</span
                  >
                  <span class="text-xs text-gray-500 font-medium">
                    {{ message.createdAt | date: 'today' }} at
                    {{ message.createdAt | date: 'shortTime' }}
                  </span>
                </div>

                <div class="text-gray-300 text-base break-words font-normal leading-relaxed">
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
  private chatService = inject(ChatService);

  chattedWithUser = this.chatService.chattedWithUser;

  messages: MessageProps[] = [];
}
