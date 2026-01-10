import { Component, inject, OnInit } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel-service';
import { ActivatedRoute } from '@angular/router';
import { ChannelProps } from '../../../types';

@Component({
  selector: 'app-channel-message',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center w-full h-full text-center p-8">
      <div
        class="w-20 h-20 rounded-full bg-[#41434a] flex items-center justify-center mb-4 shadow-lg"
      >
        <span class="text-4xl text-gray-200 font-bold">#</span>
      </div>
      <h1 class="text-3xl font-bold text-white mb-2">This is #{{ currentChannel()?.name }}</h1>
      <p class="text-gray-400 text-lg max-w-lg">Go to or create rooms to message with friends.</p>
    </div>
  `,
  styleUrl: './channel-message.scss',
})
export class ChannelMessage implements OnInit {
  private channelService = inject(ChannelService);
  private route = inject(ActivatedRoute);

  channelId: string | null = null;
  currentChannel = this.channelService.currentChannel;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.channelId = params.get('id') ?? this.route.parent?.snapshot.paramMap.get('id') ?? null;
      if (this.channelId) {
        this.channelService.findById(this.channelId).subscribe({
          next: (response: ChannelProps) => {
            this.currentChannel.set(response);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
