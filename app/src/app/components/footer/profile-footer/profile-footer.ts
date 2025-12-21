import { Component } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { UserProps } from '../../../types';
import {
  LucideAngularModule,
  Mic,
  MicOff,
  Headphones,
  HeadphoneOff,
  Settings,
} from 'lucide-angular';

@Component({
  selector: 'app-profile-footer',
  standalone: true,
  imports: [ProfileImage, LucideAngularModule],
  template: `
    <footer class="bg-slate-900 border-t border-slate-700 px-4 py-3 w-64">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <app-profile-image [src]="user.img" />
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-white text-sm truncate">
              {{ user.username }}
            </div>
            <div class="text-xs text-slate-400 truncate">
              {{ user.status }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            (click)="microphoneActive = !microphoneActive"
            class="p-2 hover:bg-slate-800 rounded transition-colors"
            [class.text-red-500]="!microphoneActive"
          >
            @if (microphoneActive) {
              <lucide-icon [img]="Mic" class="w-4 h-4 text-slate-400 hover:text-white" />
            } @else {
              <lucide-icon [img]="MicOff" class="w-4 h-4 text-red-500" />
            }
          </button>

          <button
            (click)="headphonesActive = !headphonesActive"
            class="p-2 hover:bg-slate-800 rounded transition-colors"
            [class.text-red-500]="!headphonesActive"
          >
            @if (headphonesActive) {
              <lucide-icon [img]="Headphones" class="w-4 h-4 text-slate-400 hover:text-white" />
            } @else {
              <lucide-icon [img]="HeadphoneOff" class="w-4 h-4 text-red-500" />
            }
          </button>

          <button class="p-2 hover:bg-slate-800 rounded transition-colors">
            <lucide-icon [img]="Settings" class="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './profile-footer.scss',
})
export class ProfileFooter {
  user!: UserProps;
  microphoneActive: boolean = true;
  headphonesActive: boolean = true;
  readonly Mic = Mic;
  readonly MicOff = MicOff;
  readonly Headphones = Headphones;
  readonly HeadphoneOff = HeadphoneOff;
  readonly Settings = Settings;
}
