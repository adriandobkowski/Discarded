import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Status } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, LogOut, Pencil, ChevronRight } from 'lucide-angular';
import { AuthService } from '../../../services/auth/auth-service';
import { UserService } from '../../../services/user/user-service';

@Component({
  selector: 'app-change-user-status-modal',
  imports: [ProfileImage, RouterLink, LucideAngularModule, NgClass],
  template: `
    <div
      class="fixed left-2 bottom-[76px] w-60 rounded-lg border border-[#1F2023] bg-[#232428] shadow-xl z-50 overflow-visible"
    >
      <div class="h-14 bg-gradient-to-b from-[#3A3C43] to-[#232428] relative">
        <div class="absolute left-3 -bottom-5">
          <app-profile-image [src]="user()?.img" [status]="user()?.status" />
        </div>
      </div>

      <div class="pt-7 px-3 pb-2">
        <div class="text-white font-semibold text-sm truncate">{{ user()?.username }}</div>
        <div class="text-xs text-gray-400 truncate">{{ user()?.email }}</div>
      </div>

      <div class="px-2 pb-2">
        <a
          class="flex items-center gap-2 px-2 py-2 rounded hover:bg-[#3F4147] transition-colors text-gray-200"
          [routerLink]="['/', 'settings']"
          (click)="requestClose()"
        >
          <lucide-icon [img]="Pencil" class="w-4 h-4" />
          <div class="text-sm">Edit Profile</div>
        </a>

        <div class="relative group" (mouseleave)="scheduleCloseStatusMenu()">
          <button
            type="button"
            class="w-full flex items-center justify-between gap-2 px-2 py-2 rounded hover:bg-[#3F4147] transition-colors text-gray-200"
            (mouseenter)="openStatusMenu()"
            (focus)="openStatusMenu()"
            [attr.aria-expanded]="statusMenuOpen"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-2 h-2 rounded-full" [ngClass]="statusDotClass(user()?.status)"></span>
              <div class="text-sm truncate">{{ user()?.status }}</div>
            </div>
            <lucide-icon [img]="ChevronRight" class="w-4 h-4 text-gray-400" />
          </button>

          <div
            class="absolute left-full top-0 ml-2 w-40 rounded-lg border border-[#1F2023] bg-[#232428] shadow-xl overflow-hidden transition-all"
            (mouseenter)="openStatusMenu()"
            (mouseleave)="scheduleCloseStatusMenu()"
            [class.opacity-0]="!statusMenuOpen"
            [class.invisible]="!statusMenuOpen"
            [class.translate-x-1]="!statusMenuOpen"
            [class.opacity-100]="statusMenuOpen"
            [class.visible]="statusMenuOpen"
            [class.translate-x-0]="statusMenuOpen"
          >
            @for (opt of statusOptions; track opt.value) {
              <button
                type="button"
                class="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#3F4147] transition-colors"
                (click)="setStatus(opt.value)"
              >
                <span class="w-2 h-2 rounded-full" [ngClass]="opt.dotClass"></span>
                <span class="text-sm text-gray-200">{{ opt.label }}</span>
              </button>
            }
          </div>
        </div>

        <button
          type="button"
          class="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-[#3F4147] transition-colors text-gray-200"
          (click)="logout()"
        >
          <lucide-icon [img]="LogOut" class="w-4 h-4" />
          <div class="text-sm">Log Out</div>
        </button>
      </div>
    </div>
  `,
  styleUrl: './change-user-status-modal.scss',
})
export class ChangeUserStatusModal {
  readonly Pencil = Pencil;
  readonly ChevronRight = ChevronRight;
  readonly LogOut = LogOut;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  user = this.authService.user;

  statusMenuOpen = false;

  private statusCloseTimer: ReturnType<typeof setTimeout> | null = null;

  readonly statusOptions: { value: Status; label: string; dotClass: string }[] = [
    { value: 'online', label: 'Online', dotClass: 'bg-emerald-500' },
    { value: 'busy', label: 'Busy', dotClass: 'bg-amber-400' },
    { value: 'offline', label: 'Offline', dotClass: 'bg-gray-400' },
  ];

  statusDotClass(status?: Status | null): string {
    switch (status) {
      case 'online':
        return 'bg-emerald-500';
      case 'busy':
        return 'bg-amber-400';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-500';
    }
  }

  setStatus(status: Status) {
    if (!this.user()) return;

    this.statusMenuOpen = false;
    this.clearStatusCloseTimer();
    this.userService.updateUser({ status }).subscribe({
      next: (updatedUser) => {
        this.authService.user.set(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user.set(updatedUser);
        this.requestClose();
      },
    });
  }

  openStatusMenu() {
    this.clearStatusCloseTimer();
    this.statusMenuOpen = true;
  }

  scheduleCloseStatusMenu() {
    this.clearStatusCloseTimer();
    this.statusCloseTimer = setTimeout(() => {
      this.statusMenuOpen = false;
    }, 150);
  }

  private clearStatusCloseTimer() {
    if (this.statusCloseTimer) {
      clearTimeout(this.statusCloseTimer);
      this.statusCloseTimer = null;
    }
  }

  requestClose() {
    this.userService.closeProfileFooter.set(true);
  }

  logout() {
    this.authService.logout();
    this.requestClose();
    void this.router.navigate(['/', 'login']);
  }
}
