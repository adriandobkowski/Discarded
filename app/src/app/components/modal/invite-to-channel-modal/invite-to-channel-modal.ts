import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { SearchComponent } from '../../main/search/search';
import { UserProps } from '../../../types';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { LucideAngularModule, X } from 'lucide-angular';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-invite-to-channel-modal',
  imports: [SearchComponent, ProfileImageComponent, LucideAngularModule],
  standalone:true,
  templateUrl: './invite-to-channel-modal.html',
  styleUrl: './invite-to-channel-modal.scss',
})
export class InviteToChannelModalComponent implements OnInit {
  protected readonly X = X;
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);

  protected currentChannel = this.channelService.currentChannel;

  protected friendsToInvite = signal<UserProps[]>([]);

  protected filteredfriends = computed(() =>
    this.friendsToInvite().filter((user) =>
      user.username.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );
  protected search = signal<string>('');

  protected inviteToChannelModalActive = this.channelService.inviteToChannelModalActive;

  public ngOnInit(): void {
    this.channelService.findFriendsToInviteToChannel().subscribe({
      next: (response: UserProps[]) => {
        this.friendsToInvite.set(response);
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Could not load friends to invite', 'Error');
      },
    });
  }

  protected close():void {
    this.inviteToChannelModalActive.set(false);
  }
}
