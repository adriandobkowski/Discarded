import { Component, inject, input, OnInit } from '@angular/core';
import { RoomProps, UserProps } from '../../../types';
import { LucideAngularModule, X } from 'lucide-angular';
import { Search } from '../../main/search/search';
import { UserService } from '../../../services/user/user-service';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { ChannelService } from '../../../services/channel/channel-service';

@Component({
  selector: 'app-add-to-room',
  imports: [LucideAngularModule, Search, ProfileImage],
  template: `
    <div>
      <nav>
        <div>
          <div>Invite friends to: {{ room()?.name }}</div>
        </div>
        <button>
          <lucide-icon [img]="X" />
        </button>
      </nav>
      <div>
        <app-search />
      </div>
      <main>
        @for (user of this.users; track user.id) {
          <div>
            <div>
              <app-profile-image [src]="user?.img" />
              <div>{{ user.username }}</div>
            </div>
            <button (click)="addToChannel(user.id)">Invite</button>
          </div>
        }
      </main>
    </div>
  `,
  styleUrl: './add-to-room.scss',
})
export class AddToRoom implements OnInit {
  readonly X = X;

  private userService = inject(UserService);
  private channelService = inject(ChannelService);

  users: UserProps[] = [];

  room = input<RoomProps | null>(null);
  ngOnInit(): void {
    this.userService.findFriends().subscribe({
      next: (response: UserProps[]) => {
        this.users = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToChannel(userId: string): void {
    this.channelService.inviteToChannel(userId);
  }
}
