import { Component, effect, inject } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { LucideAngularModule, Hash, Plus } from 'lucide-angular';
import { RoomService } from '../../../services/room/room-service';
import { RoomProps } from '../../../types';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-channel-navbar',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './channel-navbar.html',
  styleUrl: './channel-navbar.scss',
})
export class ChannelNavbarComponent {
  protected readonly Hash = Hash;
  protected readonly Plus = Plus;
  private channelService = inject(ChannelService);
  private roomService = inject(RoomService);
  private toastService = inject(ToastService);

  private roomId = this.roomService.roomId;
  protected currentRoom = this.roomService.currentRoom;

  protected currentChannel = this.channelService.currentChannel;
  protected createRoomClicked = this.channelService.createRoomClicked;

  public constructor() {
    effect(() => {
      if (this.roomId()) {
        this.roomService.findRoomById().subscribe({
          next: (response: RoomProps) => {
            this.currentRoom.set(response);
          },
          error: (err) => {
            this.toastService.errorFrom(err, 'Error finding room');
          },
        });
      }
    });
  }
}
