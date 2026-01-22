import { Component, inject, signal } from '@angular/core';
import { SearchComponent } from '../../main/search/search';
import { UserService } from '../../../services/user/user-service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-navbar-add-friend',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './navbar-add-friend.html',
  styleUrl: './navbar-add-friend.scss',
})
export class NavbarAddFriendComponent {
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  protected search = signal<string>('');

  protected sendFriendRequest(username: string): void {
    this.userService.sendFriendRequest(username).subscribe({
      next: () => {
        this.toastService.success('Friend request sent');
        this.search.set('');
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Could not send friend request', 'Error');
      },
    });
  }
}
