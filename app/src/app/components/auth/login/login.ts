import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { UserProps } from '../../../types/user';
import { Router, RouterLink } from '@angular/router';
import { trimmedRequired } from '../../../validators/form-validators';
import { ToastService } from '../../../services/toast/toast.service';
import { LoginForm, LoginProps } from '../../../types/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  protected loginForm = new FormGroup<LoginForm>({
    email: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        (control) => Validators.email(control),
      ],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        Validators.minLength(8),
      ],
      nonNullable: true,
    }),
  });
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      const newLogin: LoginProps = {
        email: email,
        password: password,
      };

      this.authService.login(newLogin).subscribe({
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
