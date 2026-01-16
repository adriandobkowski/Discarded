import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Status } from '../../../types';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, LogOut, Pencil, ChevronRight } from 'lucide-angular';
import { AuthService } from '../../../services/auth/auth-service';
import { UserService } from '../../../services/user/user-service';

@Component({
  selector: 'app-change-user-status-modal',
  standalone:true,
  imports: [ProfileImageComponent, RouterLink, LucideAngularModule, NgClass],
  templateUrl: './change-user-status-modal.html',
  styleUrl: './change-user-status-modal.scss',
})

export class ChangeUserStatusModalComponent {
  protected readonly Pencil = Pencil;
  protected readonly ChevronRight = ChevronRight;
  protected readonly LogOut = LogOut;
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  protected user = this.authService.user;

  protected statusMenuOpen = false;

  private statusCloseTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly statusOptions: { value: Status; label: string; dotClass: string }[] = [
    { value: 'online', label: 'Online', dotClass: 'bg-emerald-500' },
    { value: 'busy', label: 'Busy', dotClass: 'bg-amber-400' },
    { value: 'offline', label: 'Offline', dotClass: 'bg-gray-400' },
  ];

  protected statusDotClass(status?: Status | null): string {
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

  protected setStatus(status: Status): void {
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

  protected openStatusMenu(): void {
    this.clearStatusCloseTimer();
    this.statusMenuOpen = true;
  }

  protected scheduleCloseStatusMenu(): void {
    this.clearStatusCloseTimer();
    this.statusCloseTimer = setTimeout(() => {
      this.statusMenuOpen = false;
    }, 150);
  }

  private clearStatusCloseTimer(): void {
    if (this.statusCloseTimer) {
      clearTimeout(this.statusCloseTimer);
      this.statusCloseTimer = null;
    }
  }

  protected requestClose(): void {
    this.userService.closeProfileFooter.set(true);
  }

  protected logout(): void {
    this.authService.logout();
    this.requestClose();
    void this.router.navigate(['/', 'login']);
  }
}
