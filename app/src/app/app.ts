import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChannelModalComponent } from './components/modal/create-channel-modal/create-channel-modal';
import { ChannelService } from './services/channel/channel-service';
import { UserService } from './services/user/user-service';
import { AddFriendComponent } from './components/modal/add-friend/add-friend';
import { ChangeUserStatusModalComponent } from './components/modal/change-user-status-modal/change-user-status-modal';
import { AuthService } from './services/auth/auth-service';
import { InboxModalComponent } from './components/modal/inbox-modal/inbox-modal';
import { InviteToChannelModalComponent } from './components/modal/invite-to-channel-modal/invite-to-channel-modal';
import { DeleteAccountModalComponent } from "./components/modal/delete-account-modal/delete-account-modal";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterOutlet,
    CreateChannelModalComponent,
    AddFriendComponent,
    ChangeUserStatusModalComponent,
    InboxModalComponent,
    InviteToChannelModalComponent,
    DeleteAccountModalComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class AppComponent {
  protected readonly title = signal('app');

  private channelService = inject(ChannelService);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  protected createChannelClicked = this.channelService.createChannelClicked;

  protected addFriendIsOpen = this.userService.addFriendIsOpen;

  protected user = this.authService.user;

  protected statusModalOpen = this.userService.statusModalOpen;

  protected inboxActive = this.userService.inboxActive;

  protected inviteToChannelModalActive = this.channelService.inviteToChannelModalActive;

  protected deleteAccountClicked = this.userService.deleteAccountClicked;

  public constructor() {
    effect(() => {
      if (this.userService.closeProfileFooter()) {
        this.statusModalOpen.set(false);
        this.userService.closeProfileFooter.set(false);
      }
    });
  }
}
