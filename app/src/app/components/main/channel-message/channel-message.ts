import { Component, inject, OnInit } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { ActivatedRoute } from '@angular/router';
import { ChannelProps } from '../../../types/channel';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-channel-message',
  standalone: true,
  imports: [],
  templateUrl: './channel-message.html',
  styleUrl: './channel-message.scss',
})
export class ChannelMessageComponent implements OnInit {
  private channelService = inject(ChannelService);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  protected currentChannel = this.channelService.currentChannel;
  protected channelId = this.channelService.channelId;

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      if (this.channelId()) {
        this.channelService.findById().subscribe({
          next: (response: ChannelProps) => {
            this.currentChannel.set(response);
          },
          error: (err) => {
            this.toastService.errorFrom(err, 'Could not load channel', 'Error');
          },
        });
      }
    });
  }
}
