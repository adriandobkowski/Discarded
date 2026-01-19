import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user-service';
import { TriangleAlert, LucideAngularModule, X } from 'lucide-angular';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account-modal',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './delete-account-modal.html',
  styleUrl: './delete-account-modal.scss',
})
export class DeleteAccountModalComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected readonly X = X;
  protected readonly TriangleAlert = TriangleAlert;

  protected deleteAccountClicked = this.userService.deleteAccountClicked;
  protected user = this.authService.user;

  protected close(): void {
    this.deleteAccountClicked.set(false);
  }

  protected deleteAccount(): void {
    this.userService.deleteAccount().subscribe({
      next: () => {
        this.authService.logout();
        void this.router.navigate(['/login']);
      },
    });
  }
}
