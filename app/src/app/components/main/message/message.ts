import { Component } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { DatePipe } from '@angular/common';

interface MessageProps {
  id: string;
  user: UserProps;
  message: string;
  createdAt: Date;
}

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileImage, DatePipe],
  template: `
    <div class="flex flex-col gap-0">
      @for (message of messages; track message.id) {
        <div class="group hover:bg-slate-700/50 transition-colors py-2 px-4">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <app-profile-image [src]="message.user.img" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="font-semibold text-white text-sm">{{ message.user.username }}</span>
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
    </div>
  `,
  styleUrl: './message.scss',
})
export class Message {
  messages: MessageProps[] = [];
}
