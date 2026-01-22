import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { ProfileImageComponent } from '../profile/profile-image/profile-image';
import { LucideAngularModule, Pencil, UserPen, LogOut, X, Trash } from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user-service';
import { UpdateForm, UserProps } from '../../types/user';
import { Router, RouterLink } from '@angular/router';
import { trimmedRequired } from '../../validators/form-validators';
import { FileSaverService } from '../../services/fileSaver/file-saver.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-settings',
  imports: [ProfileImageComponent, LucideAngularModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  protected readonly Pencil = Pencil;
  protected readonly UserPen = UserPen;
  protected readonly LogOut = LogOut;
  protected readonly Trash = Trash;
  protected readonly X = X;
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  private fileSaverService = inject(FileSaverService);

  private router = inject(Router);

  protected user = this.authService.user()!;

  protected deleteAccountClicked = this.userService.deleteAccountClicked;

  protected updateForm = new FormGroup<UpdateForm>({
    img: new FormControl<string>(this.user.img ?? '', {
      nonNullable: true,
      validators: [trimmedRequired, Validators.minLength(1)],
    }),
    username: new FormControl<string>(this.user.username, {
      nonNullable: true,
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        Validators.minLength(3),
        Validators.maxLength(24),
      ],
    }),
    email: new FormControl<string>(this.user.email, {
      nonNullable: true,
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        (control) => Validators.email(control),
      ],
    }),
  });

  protected updateUsernameClicked: boolean = false;
  protected updateEmailClicked: boolean = false;
  protected logoutClicked: boolean = false;

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    this.fileSaverService.fileToBase64(files[0]).subscribe({
      next: (response: string) => {
        this.updateForm.patchValue({ img: response });
        this.updateForm.markAsDirty();
      },
      error: (err) => {
        this.toastService.errorFrom(err, "Couldn't upload image");
      },
    });
  }

  protected onSubmit(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      this.toastService.error('Please fix validation errors', 'Invalid form');

      return;
    }
    this.userService.updateUser(this.updateForm.getRawValue() as UserProps).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.authService.user.set(updatedUser);
        this.updateForm.markAsPristine();
        this.toastService.success('Profile updated');
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Could not save changes', 'Update failed');
      },
    });
  }
  protected onLogout(): void {
    this.authService.logout();
    void this.router.navigate(['/', 'login']);
  }

  protected openDeleteAccount(): void {
    this.deleteAccountClicked.set(true);
  }
  protected get activeImg(): string {
    return this.updateForm.get('img')?.value ?? this.user.img!;
  }
  protected get activeUsername(): string {
    return this.updateForm.get('username')?.value ?? this.user.username;
  }
  protected get activeEmail(): string {
    return this.updateForm.get('email')?.value ?? this.user.email;
  }
}
