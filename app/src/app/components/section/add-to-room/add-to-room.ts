import { Component, inject, input, OnInit } from '@angular/core';
import { RoomProps, UserProps } from '../../../types';
import { LucideAngularModule, X } from 'lucide-angular';
import { SearchComponent } from '../../main/search/search';
import { UserService } from '../../../services/user/user-service';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { ChannelService } from '../../../services/channel/channel-service';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-add-to-room',
  imports: [LucideAngularModule, SearchComponent, ProfileImageComponent],
  standalone:true,
  templateUrl: './add-to-room.html',
  styleUrl: './add-to-room.scss',
})
export class AddToRoomComponent implements OnInit {
  protected readonly X = X;
  private userService = inject(UserService);
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);

  protected users: UserProps[] = [];

  protected room = input<RoomProps | null>(null);
  public ngOnInit(): void {
    this.userService.findFriends().subscribe({
      next: (response: UserProps[]) => {
        this.users = response;
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Could not load friends', 'Error');
      },
    });
  }
  protected addToChannel(userId: string): void {
    this.channelService.inviteToChannel(userId);
  }
}
