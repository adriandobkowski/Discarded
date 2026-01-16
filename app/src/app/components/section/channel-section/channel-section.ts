import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, House, Plus } from 'lucide-angular';
import { ChannelProps } from '../../../types';
import { ChannelService } from '../../../services/channel/channel-service';
import { ToastService } from '../../../services/toast/toast-service';
@Component({
  selector: 'app-channel-section',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './channel-section.html',
  styleUrl: './channel-section.scss',
})
export class ChannelSectionComponent implements OnInit {
  protected readonly House = House;
  protected readonly Plus = Plus;
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);

  protected channels = this.channelService.channels();

  protected createChannelClicked = this.channelService.createChannelClicked;
  public ngOnInit(): void {
    this.channelService.findAll().subscribe({
      next: (response: ChannelProps[]) => {
        this.channels = response;
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Could not load channels', 'Error');
      },
    });
  }
}
