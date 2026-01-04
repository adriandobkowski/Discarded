import { Component, input } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';

@Component({
  selector: 'app-chat-aside',
  standalone: true,
  imports: [ProfileImage],
  template: `
    <div class="flex flex-col items-center">
      <div class="relative w-full h-32 bg-gradient-to-b from-slate-600 to-slate-700"></div>
      <div class="relative -mt-12 z-10 mb-4">
        <app-profile-image [src]="user()?.img" />
      </div>
      <div class="text-center">
        <div class="font-semibold text-white text-lg">{{ user()?.username }}</div>
      </div>
      <div class="text-center text-slate-400 text-sm mt-4 pb-4">
        <div class="text-xs text-slate-500 uppercase tracking-wide">Member since</div>
        <div class="mt-1">{{ user()?.createdAt }}</div>
      </div>
    </div>
  `,
  styleUrl: './chat-aside.scss',
})
export class ChatAside {
  user = input<UserProps>();
}
