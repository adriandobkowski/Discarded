import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginProps, UserProps } from '../../../types';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex h-full items-center justify-center bg-[#5865F2]">
      <form
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit()"
        class="bg-[#313338] p-8 rounded shadow-md w-[480px] flex flex-col gap-5"
      >
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <div class="text-gray-400 text-base">We're so excited to see you again!</div>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-2" for="email"
            >E-mail</label
          >
          <input
            id="email"
            type="text"
            formControlName="email"
            class="bg-[#1E1F22] w-full p-2.5 rounded text-white focus:outline-none focus:ring-0"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-2" for="password"
            >Password</label
          >
          <input
            id="password"
            type="password"
            formControlName="password"
            class="bg-[#1E1F22] w-full p-2.5 rounded text-white focus:outline-none focus:ring-0"
          />
          <div class="text-[#00A8FC] text-xs mt-1 cursor-pointer hover:underline">
            Forgot your password?
          </div>
        </div>

        <button
          type="submit"
          class="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 rounded transition-colors w-full mt-2"
        >
          Log In
        </button>

        <div class="text-gray-400 text-xs mt-2">
          Need an account?
          <a routerLink="/register" class="text-[#00A8FC] cursor-pointer hover:underline"
            >Register</a
          >
        </div>
      </form>
    </div>
  `,
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue() as LoginProps).subscribe({
        next: (response: UserProps) => {
          this.authService.user.set(response);
          this.toastService.success('Logged in successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.toastService.error('Invalid credentials or server error', 'Login failed');
        },
      });
    }
  }
}
