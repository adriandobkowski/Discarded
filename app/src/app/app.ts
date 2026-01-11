import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChannelModal } from './components/modal/create-channel-modal/create-channel-modal';
import { ChannelService } from './services/channel/channel-service';
import { UserService } from './services/user/user-service';
import { AddFriend } from './components/modal/add-friend/add-friend';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateChannelModal, AddFriend],
  template: `
    <router-outlet />

    @if (createChannelClicked()) {
      <app-create-channel-modal></app-create-channel-modal>
    }
    @if (addFriendIsOpen()) {
      <app-add-friend></app-add-friend>
    }
  `,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('app');

  private channelService = inject(ChannelService);
  private userService = inject(UserService);

  createChannelClicked = this.channelService.createChannelClicked;

  addFriendIsOpen = this.userService.addFriendIsOpen;
}
