import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginProps, UserProps } from '../../../types';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast/toast-service';
import { trimmedRequired } from '../../../validators/form-validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  protected loginForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        (control) => Validators.email(control),
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
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue() as LoginProps).subscribe({
        next: (response: UserProps) => {
          this.authService.user.set(response);
          this.toastService.success('Logged in successfully');
          void this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastService.errorFrom(err, 'Invalid credentials or server error', 'Login failed');
        },
      });
    }
  }
}
