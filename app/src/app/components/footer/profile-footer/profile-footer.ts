import { Component, inject } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import {
  HeadphoneOff,
  Headphones,
  LucideAngularModule,
  Mic,
  MicOff,
  Settings,
  Sun,
  Moon,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user-service';
import { AuthService } from '../../../services/auth/auth-service';
import { ThemeService } from '../../../services/theme/theme-service';

@Component({
  selector: 'app-profile-footer',
  standalone: true,
  imports: [ProfileImage, LucideAngularModule, RouterLink],
  template: `
    <footer
      class="fixed left-2 bottom-2 bg-[#232428] border border-[#1F2023] w-60 rounded-lg p-2 shadow-md"
    >
      <div class="flex items-center justify-between">
        <div
          class="flex items-center gap-2 flex-1 min-w-0 group cursor-pointer hover:bg-[#3F4147] p-1 rounded transition-colors -ml-1"
          (click)="statusModalOpen.set(!statusModalOpen())"
          (keydown.enter)="statusModalOpen.set(!statusModalOpen())"
          tabindex="0"
        >
          <app-profile-image [src]="user()?.img" [status]="user()?.status" />
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-white text-sm truncate">
              {{ user()?.username }}
            </div>
            <div class="text-xs text-gray-400 truncate">
              {{ user()?.status }}
            </div>
          </div>
        </div>

        <div class="flex items-center flex-shrink-0">
          <button
            type="button"
            (click)="toggleTheme()"
            class="p-2 hover:bg-[#3F4147] rounded transition-colors flex items-center justify-center h-8 w-8"
            [attr.aria-label]="theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            @if (theme() === 'dark') {
              <lucide-icon [img]="Sun" class="w-5 h-5 text-gray-300 hover:text-white" />
            } @else {
              <lucide-icon [img]="Moon" class="w-5 h-5 text-gray-300 hover:text-white" />
            }
          </button>

          <button
            (click)="microphoneActive.set(!microphoneActive())"
            class="p-2 hover:bg-[#3F4147] rounded transition-colors flex items-center justify-center h-8 w-8"
            [class.text-red-500]="!microphoneActive()"
          >
            @if (microphoneActive()) {
              <lucide-icon name="mic" [img]="Mic" class="w-5 h-5 text-gray-300 hover:text-white" />
            } @else {
              <lucide-icon name="micoff" [img]="MicOff" class="w-5 h-5 text-red-500" />
            }
          </button>

          <button
            (click)="headphonesActive.set(!headphonesActive())"
            class="p-2 hover:bg-[#3F4147] rounded transition-colors flex items-center justify-center h-8 w-8"
            [class.text-red-500]="!headphonesActive()"
          >
            @if (headphonesActive()) {
              <lucide-icon
                name="Headphones"
                [img]="Headphones"
                class="w-5 h-5 text-gray-300 hover:text-white"
              />
            } @else {
              <lucide-icon name="HeadphoneOff" [img]="HeadphoneOff" class="w-5 h-5 text-red-500" />
            }
          </button>

          <a
            [routerLink]="['/', 'settings']"
            class="p-2 hover:bg-[#3F4147] rounded transition-colors flex items-center justify-center h-8 w-8"
          >
            <lucide-icon
              name="Settings"
              [img]="Settings"
              class="w-5 h-5 text-gray-300 hover:text-white"
            />
          </a>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './profile-footer.scss',
})
export class ProfileFooter {
  readonly Mic = Mic;
  readonly Settings = Settings;
  readonly Headphones = Headphones;
  readonly HeadphoneOff = HeadphoneOff;
  readonly MicOff = MicOff;
  readonly Sun = Sun;
  readonly Moon = Moon;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private themeService = inject(ThemeService);

  statusModalOpen = this.userService.statusModalOpen;

  user = this.authService.user;

  theme = this.themeService.theme;

  microphoneActive = this.userService.microphoneActive;
  headphonesActive = this.userService.headphonesActive;

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
