import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { ProfileImage } from '../profile/profile-image/profile-image';
import { LucideAngularModule, Pencil, UserPen, LogOut, X } from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user-service';
import { UserProps } from '../../types';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast/toast-service';

@Component({
  selector: 'app-settings',
  imports: [ProfileImage, LucideAngularModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        class="flex w-[1000px] h-[80vh] bg-[#313338] text-gray-100 font-sans rounded-xl overflow-hidden shadow-2xl"
      >
        <section class="flex flex-col w-[280px] bg-[#2B2D31] pt-14 px-4 items-end shrink-0">
          <main class="w-[200px]">
            <label
              for="user-settings"
              class="text-xs font-bold text-gray-400 uppercase mb-2 block px-2"
              >User Settings</label
            >
            <div class="flex flex-col gap-1">
              <div
                class="flex items-center gap-2 px-2 py-1.5 rounded bg-[#404249] text-white cursor-pointer"
              >
                <lucide-icon [img]="UserPen" class="w-5 h-5" />
                <div class="font-medium">My account</div>
              </div>
              <button
                class="flex items-center cursor-pointer gap-2 px-2 py-1.5 rounded hover:bg-[#35373C] text-gray-400 hover:text-gray-200 w-full text-left transition-colors"
                (click)="onLogout()"
              >
                <lucide-icon [img]="LogOut" class="w-5 h-5" />
                <div class="font-medium">Log out</div>
              </button>
            </div>
          </main>
        </section>
        <main class="flex-1 px-10 py-4 bg-[#313338] overflow-y-auto">
          <nav class="flex justify-between items-start mb-6 max-w-3xl">
            <div class="text-xl font-bold text-white">My account</div>
            <div class="flex flex-col items-center group cursor-pointer">
              <a
                routerLink="/"
                class="flex justify-center items-center w-9 h-9 text-gray-400 group-hover:text-white group-hover:border-white rounded-full transition-all"
              >
                <lucide-icon [img]="X" class="w-8 h-8" />
              </a>
            </div>
          </nav>
          <form [formGroup]="updateForm" class="max-w-3xl" (ngSubmit)="onSubmit()">
            <div class="bg-[#202225] rounded-t-lg min-h-[100px] mb-12 relative p-4">
              <div class="bg-[#5865F2] h-24 w-full absolute top-0 left-0 rounded-t-lg"></div>
              <div class="relative top-12 left-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-1.5 bg-[#202225] rounded-full relative">
                    <app-profile-image [src]="user.img" [status]="user.status" />
                  </div>
                  <div class="text-xl font-bold mt-2">{{ user.username }}</div>
                </div>
              </div>
            </div>

            <div class="bg-[#2B2D31] rounded-lg p-4">
              <div class="flex justify-between items-end py-4 border-b border-[#1E1F22]">
                <div class="flex-1">
                  <label for="username" class="text-xs font-bold text-gray-400 uppercase mb-1 block"
                    >Username</label
                  >
                  @if (!updateUsernameClicked) {
                    <div class="text-white h-10 px-2 flex items-center">{{ activeUsername }}</div>
                  } @else {
                    <input
                      type="text"
                      formControlName="username"
                      [defaultValue]="activeUsername"
                      class="bg-[#1E1F22] text-white h-10 px-2 rounded w-full outline-none font-medium"
                    />
                  }
                </div>
                <button
                  type="button"
                  (click)="updateUsernameClicked = !updateUsernameClicked"
                  class="bg-[#4E5058] hover:bg-[#6D6F78] text-white px-4 py-2.5 mx-4 rounded text-sm transition-colors"
                >
                  {{ updateUsernameClicked ? 'Done' : 'Edit' }}
                </button>
              </div>

              <div class="flex justify-between items-end py-4">
                <div class="flex-1">
                  <label for="email" class="text-xs font-bold text-gray-400 uppercase mb-1 block"
                    >E-mail</label
                  >
                  @if (!updateEmailClicked) {
                    <div class="text-white h-10 px-2 flex items-center">{{ activeEmail }}</div>
                  } @else {
                    <input
                      type="text"
                      formControlName="email"
                      [defaultValue]="activeEmail"
                      class="bg-[#1E1F22] text-white h-10 px-2 rounded w-full outline-none font-medium"
                    />
                  }
                </div>
                <button
                  type="button"
                  (click)="updateEmailClicked = !updateEmailClicked"
                  class="bg-[#4E5058] hover:bg-[#6D6F78] text-white px-4 py-2.5 mx-4 rounded text-sm transition-colors"
                >
                  {{ updateEmailClicked ? 'Done' : 'Edit' }}
                </button>
              </div>
            </div>

            <div class="mt-8 flex justify-center">
              <button
                type="submit"
                [disabled]="!updateForm.dirty"
                class="bg-[#248046] hover:enabled:bg-[#1A6334] text-white px-6 py-2 rounded font-medium transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  `,
  styleUrl: './settings.scss',
})
export class Settings {
  readonly Pencil = Pencil;
  readonly UserPen = UserPen;
  readonly LogOut = LogOut;
  readonly X = X;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  private router = inject(Router);

  user = this.authService.user()!;

  updateForm = new FormGroup({
    username: new FormControl<string | undefined>(this.user.username, {
      nonNullable: true,
    }),
    email: new FormControl<string | undefined>(this.user.email),
  });

  updateUsernameClicked: boolean = false;
  updateEmailClicked: boolean = false;
  logoutClicked: boolean = false;

  onSubmit(): void {
    this.userService.updateUser(this.updateForm.getRawValue() as UserProps).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.authService.user.set(updatedUser);
        this.updateForm.markAsPristine();
        this.toastService.success('Profile updated');
      },
      error: (err) => {
        console.log(err);
        this.toastService.error('Could not save changes', 'Update failed');
      },
    });
  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/', 'login']);
  }
  get activeUsername(): string {
    return this.updateForm.get('username')?.value ?? this.user.username;
  }
  get activeEmail(): string {
    return this.updateForm.get('email')?.value ?? this.user.email;
  }
}
