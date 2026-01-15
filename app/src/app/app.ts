import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChannelModal } from './components/modal/create-channel-modal/create-channel-modal';
import { ChannelService } from './services/channel/channel-service';
import { UserService } from './services/user/user-service';
import { AddFriend } from './components/modal/add-friend/add-friend';
import { ChangeUserStatusModal } from './components/modal/change-user-status-modal/change-user-status-modal';
import { AuthService } from './services/auth/auth-service';
import { InboxModal } from './components/modal/inbox-modal/inbox-modal';
import { InviteToChannelModal } from './components/modal/invite-to-channel-modal/invite-to-channel-modal';
import { ToastContainer } from './components/toast/toast-container/toast-container';
import { ThemeService } from './services/theme/theme-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CreateChannelModal,
    AddFriend,
    ChangeUserStatusModal,
    InboxModal,
    InviteToChannelModal,
    ToastContainer,
  ],
  template: `
    <router-outlet />

    <app-toast-container />

    @if (createChannelClicked()) {
      <app-create-channel-modal></app-create-channel-modal>
    }
    @if (addFriendIsOpen()) {
      <app-add-friend></app-add-friend>
    }
    @if (statusModalOpen()) {
      <app-change-user-status-modal />
    }
    @if (inboxActive()) {
      <app-inbox-modal />
    }
    @if (inviteToChannelModalActive()) {
      <app-invite-to-channel-modal />
    }
  `,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('app');

  private channelService = inject(ChannelService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  createChannelClicked = this.channelService.createChannelClicked;

  addFriendIsOpen = this.userService.addFriendIsOpen;

  user = this.authService.user;

  statusModalOpen = this.userService.statusModalOpen;

  inboxActive = this.userService.inboxActive;

  inviteToChannelModalActive = this.channelService.inviteToChannelModalActive;

  constructor() {
    effect(() => {
      if (this.userService.closeProfileFooter()) {
        this.statusModalOpen.set(false);
        this.userService.closeProfileFooter.set(false);
      }
    });
  }
}
