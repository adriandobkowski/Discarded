import { Component, computed, effect, inject, signal } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { SearchComponent } from '../../main/search/search';
import { UserProps } from '../../../types/user';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, X } from 'lucide-angular';
import { UserService } from '../../../services/user/user-service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-invite-to-channel-modal',
  imports: [SearchComponent, ProfileImageComponent, LucideAngularModule],
  standalone: true,
  templateUrl: './invite-to-channel-modal.html',
  styleUrl: './invite-to-channel-modal.scss',
})
export class InviteToChannelModalComponent {
  protected readonly X = X;
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);
  private userService = inject(UserService);
  protected currentChannel = this.channelService.currentChannel;

  protected channelUsers = this.channelService.channelUsers;

  protected friendsToInvite = this.userService.friendsToInvite;

  protected filteredfriends = computed(() =>
    this.friendsToInvite().filter((user) =>
      user.username.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );
  protected search = signal<string>('');

  protected inviteToChannelModalActive = this.channelService.inviteToChannelModalActive;

  public constructor() {
    effect(() => {
      this.channelService.findFriendsToInviteToChannel().subscribe({
        next: (response: UserProps[]) => {
          this.friendsToInvite.set(response);
        },
        error: (err) => {
          this.toastService.errorFrom(err, 'Could not load friends to invite', 'Error');
        },
      });
    });
  }

  protected inviteToChannel(id: string): void {
    this.channelService.inviteToChannel(id).subscribe({
      next: () => {
        this.friendsToInvite.update((previous: UserProps[]) =>
          previous.filter((user: UserProps) => user.id !== id),
        );
        this.channelService.findChannelUsers().subscribe({
          next: (users) => this.channelUsers.set(users),
          error: (err) =>
            this.toastService.errorFrom(err, 'Could not refresh channel users', 'Error'),
        });
      },
    });
  }

  protected close(): void {
    this.inviteToChannelModalActive.set(false);
  }
}
