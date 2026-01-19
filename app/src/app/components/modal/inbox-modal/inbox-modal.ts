import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user-service';
import { Check, Inbox, LucideAngularModule, X } from 'lucide-angular';
import { UserProps } from '../../../types';
import { ToastService } from '../../../services/toast/toast-service';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { FriendStoreService } from '../../../services/friends/friendStore/friend-store.service';

@Component({
  selector: 'app-inbox-modal',
  imports: [LucideAngularModule, ProfileImageComponent],
  standalone: true,
  templateUrl: './inbox-modal.html',
  styleUrl: './inbox-modal.scss',
})
export class InboxModalComponent implements OnInit {
  protected readonly Inbox = Inbox;
  protected readonly Check = Check;
  protected readonly X = X;
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private friendStoreService = inject(FriendStoreService);
  protected friends = this.friendStoreService.friends;

  protected friendRequestUsers: UserProps[] = [];

  public ngOnInit(): void {
    this.userService.findUsersByFriendRequests().subscribe({
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
      next: () => {
        this.friends.update((previous: UserProps[]) => [
          ...previous,
          this.friendRequestUsers.find((friend: UserProps) => friend.id === friendId) as UserProps,
        ]);
        this.friendRequestUsers = this.friendRequestUsers.filter(
          (previous: UserProps) => previous.id !== friendId,
        );

        this.toastService.success('Friend request accepted');
      },
      error: (err) => this.toastService.errorFrom(err, 'Could not accept request', 'Error'),
    });
  }

  protected deny(friendId: string): void {
    this.userService.denyFriendRequest(friendId).subscribe({
      next: () => {
        this.toastService.info('Friend request denied');
        this.friendRequestUsers = this.friendRequestUsers.filter(
          (previous: UserProps) => previous.id !== friendId,
        );
      },
      error: (err) => this.toastService.errorFrom(err, 'Could not deny request', 'Error'),
    });
  }
}
