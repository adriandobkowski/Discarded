import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChannelModal } from './components/modal/create-channel-modal/create-channel-modal';
import { ChannelService } from './services/channel/channel-service';
import { UserService } from './services/user/user-service';
import { AddFriend } from './components/modal/add-friend/add-friend';
import { ChangeUserStatusModal } from './components/modal/change-user-status-modal/change-user-status-modal';
import { AuthService } from './services/auth/auth-service';
import { InboxModal } from './components/modal/inbox-modal/inbox-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateChannelModal, AddFriend, ChangeUserStatusModal, InboxModal],
  template: `
    <router-outlet />

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
  `,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('app');

  private channelService = inject(ChannelService);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  createChannelClicked = this.channelService.createChannelClicked;

  addFriendIsOpen = this.userService.addFriendIsOpen;

  user = this.authService.user;

  statusModalOpen = this.userService.statusModalOpen;

  inboxActive = this.userService.inboxActive;

  constructor() {
    effect(() => {
      if (this.userService.closeProfileFooter()) {
        this.statusModalOpen.set(false);
        this.userService.closeProfileFooter.set(false);
      }
    });
  }
}
