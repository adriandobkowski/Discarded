import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginProps, UserProps } from '../../../types';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex h-full items-center justify-center bg-[#5865F2]">
      <form
        [formGroup]="registerForm"
        (ngSubmit)="onSubmit()"
        class="bg-[#313338] p-8 rounded shadow-md w-[480px] flex flex-col gap-5"
      >
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white mb-2">Create an account</h2>
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
          <label class="block text-xs font-bold text-gray-400 uppercase mb-2" for="username"
            >Username</label
          >
          <input
            id="username"
            type="text"
            formControlName="username"
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
        </div>

        <button
          type="submit"
          class="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 rounded transition-colors w-full mt-2"
        >
          Continue
        </button>

        <div class="text-gray-400 text-xs mt-2">
          <a routerLink="/login" class="text-[#00A8FC] cursor-pointer hover:underline"
            >Already have an account?</a
          >
        </div>
      </form>
    </div>
  `,
  styleUrl: './register.scss',
})
export class Register {
  registerForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    username: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.getRawValue() as UserProps & LoginProps)
        .subscribe({
          next: () => {
            this.registerForm.reset();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
