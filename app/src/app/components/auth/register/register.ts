import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginProps, UserProps } from '../../../types';
import { ToastService } from '../../../services/toast/toast-service';
import { trimmedRequired } from '../../../validators/form-validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  protected registerForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        (control) => Validators.email(control),
      ],
    }),
    username: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        Validators.minLength(3),
        Validators.maxLength(24),
      ],
    }),
    password: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        Validators.minLength(8),
      ],
    }),
  });
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.getRawValue() as UserProps & LoginProps)
        .subscribe({
          next: () => {
            this.registerForm.reset();
            this.toastService.success('Account created. You can log in now.', 'Success');
            void this.router.navigate(['/login']);
          },
          error: (err) => {
            this.toastService.errorFrom(err, 'Could not create account', 'Register failed');
          },
        });
    }
  }
}
