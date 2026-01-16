import { Component, effect, inject } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import {
  ArrowUp,
  ArrowDown,
  LucideAngularModule,
  UserRoundPlus,
  Volume2,
  Hash,
} from 'lucide-angular';
import { RoomProps } from '../../../types';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { RoomService } from '../../../services/room/room-service';
import { ToastService } from '../../../services/toast/toast-service';
@Component({
  selector: 'app-private-channel-section',
  standalone:true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './private-channel-section.html',
  styleUrl: './private-channel-section.scss',
})
export class PrivateChannelSectionComponent  {
  protected readonly ArrowUp = ArrowUp;
  protected readonly ArrowDown = ArrowDown;
  protected readonly UserRoundPlus = UserRoundPlus;
  protected readonly Volume2 = Volume2;
  protected readonly Hash = Hash;
   private channelService = inject(ChannelService);

  private roomService = inject(RoomService);
  private toastService = inject(ToastService);

  protected currentChannel = this.channelService.currentChannel;

  protected rooms: RoomProps[] = [];

  protected navbarClicked: boolean = false;

  protected inviteToChannelModalActive = this.channelService.inviteToChannelModalActive;

  public constructor() {
    effect(() => {
    const channelId = this.currentChannel()?.id;
    if (channelId) {
      this.roomService.findRoomsByChannelId(channelId).subscribe({
        next: (response: RoomProps[]) => {
          this.rooms = response;
        },
        error: (err) => {
          this.toastService.errorFrom(err, 'Could not load rooms', 'Error');
        },
      });

    }}
    );
}}
