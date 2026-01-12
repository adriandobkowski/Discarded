import { Component, inject, Input } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { DatePipe } from '@angular/common';
import { ExtendedMessageProps } from '../../../types';
import { MessageService } from '../../../services/message/message-service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileImage, DatePipe],
  template: `
    <div
      #scrollContainer
      class="flex flex-col gap-0 h-full w-full overflow-y-auto no-scrollbar pt-4"
      (scroll)="onScroll()"
    >
      <div class="min-h-full flex flex-col justify-end">
        @if (messages.length === 0) {
          <!-- <div class="flex flex-col items-start justify-end gap-2 px-4 pb-4 mt-auto min-h-[50%]">
            <div class=" mb-2">
              <app-profile-image [src]="chattedWithUser()?.img" />
            </div>
            <h2 class="text-3xl font-bold text-white">{{ chattedWithUser()?.username }}</h2>
            <div class="text-gray-400 text-base">
              This is the beginning of your direct message history with
              <span class="font-semibold">{{ chattedWithUser()?.username }}</span
              >.
            </div>
          </div> -->
        } @else {
          @for (extendedMessage of messages; track extendedMessage.message.id) {
            <div
              class="group hover:bg-[#2e3035] transition-colors py-0.5 px-4 mt-[17px] first:mt-0"
            >
              <div class="flex gap-4">
                <app-profile-image [src]="extendedMessage.user.img" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="font-medium text-white text-base hover:underline cursor-pointer">{{
                      extendedMessage.user.username
                    }}</span>
                    <span class="text-xs text-gray-500 font-medium">
                      {{ extendedMessage.message.createdAt | date: 'mediumDate' }} at
                      {{ extendedMessage.message.createdAt | date: 'shortTime' }}
                    </span>
                  </div>

                  <div class="text-gray-300 text-base break-words font-normal leading-relaxed">
                    {{ extendedMessage.message.message }}
                  </div>
                </div>
              </div>
            </div>
          }
        }

        <div #bottomAnchor></div>
      </div>
    </div>
  `,
  styleUrl: './message.scss',
})
export class Message {
  private messageService = inject(MessageService);

  onScroll = this.messageService.onScroll;

  @Input() messages: ExtendedMessageProps[] = [];
}
