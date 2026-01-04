import { Component, input } from '@angular/core';
import { Status } from '../../../types';

@Component({
  selector: 'app-profile-image',
  imports: [],
  template: `
    <div class="relative inline-block">
      <img [src]="src()" alt="Profile Image" class="w-full h-full rounded-full object-cover" />
      @if (status() === 'online') {
        <div
          class="absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-slate-900 shadow-md bg-green-500"
        ></div>
      } @else if (status() === 'busy') {
        <div
          class="absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-slate-900 shadow-md bg-red-500"
        ></div>
      } @else if (status() === 'offline') {
        <div
          class="absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-slate-900 shadow-md bg-gray-500"
        ></div>
      }
    </div>
  `,
  styleUrl: './profile-image.scss',
})
export class ProfileImage {
  src = input<string | string[]>();
  status = input<Status>();
}
