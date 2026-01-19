import { Component, inject } from '@angular/core';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { FriendStoreService } from '../../../services/friends/friendStore/friend-store.service';

@Component({
  selector: 'app-root-aside',
  imports: [ProfileImageComponent],
  standalone: true,
  templateUrl: './root-aside.html',
  styleUrl: './root-aside.scss',
})
export class RootAsideComponent {
  private friendStore = inject(FriendStoreService);

  protected activeUsers = this.friendStore.onlineFriends;
}
