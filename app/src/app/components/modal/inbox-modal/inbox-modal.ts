import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user-service';
import { Check, Inbox, LucideAngularModule, X } from 'lucide-angular';
import { UserProps } from '../../../types';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-inbox-modal',
  imports: [LucideAngularModule],
  standalone:true,
  templateUrl: './inbox-modal.html',
  styleUrl: './inbox-modal.scss',
})
export class InboxModalComponent implements OnInit {
  protected readonly Inbox = Inbox;
  protected readonly Check = Check;
  protected readonly X = X;
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  protected friendRequests = this.userService.friendRequests;

  protected friendRequestUsers: UserProps[] = [];

  public ngOnInit(): void {
    this.userService.findUsersByFriendRequests(this.friendRequests()).subscribe({
      next: (response: UserProps[]) => {
        this.friendRequestUsers = response;
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Could not load friend requests', 'Error');
      },
    });
  }

  protected accept(friendId: string): void {
    this.userService.acceptFriendRequest(friendId).subscribe({
      next: () => this.toastService.success('Friend request accepted'),
      error: (err) => this.toastService.errorFrom(err, 'Could not accept request', 'Error'),
    });
  }

  protected deny(friendId: string): void {
    this.userService.denyFriendRequest(friendId).subscribe({
      next: () => {
        this.friendRequests.update((requests) => requests.filter((id) => id !== friendId));
        this.toastService.info('Friend request denied');
      },
      error: (err) => this.toastService.errorFrom(err, 'Could not deny request', 'Error'),
    });
  }
}
