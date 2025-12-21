import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ChannelProps {
  id: string;
  img?: string;
  name: string;
  unreadMessages: number;
}

@Component({
  selector: 'app-channel-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <a [routerLink]="['/']">
        <div></div>
        <div>
          <img src="" alt="" />
          <div>Private messages</div>
        </div>
      </a>
      <div>
        @for (channel of channels(); track channel.id) {
          <a [routerLink]="['channels', channel.id]">
            <div></div>
            <div>
              <div>
                <img src="" alt="" />
                <div>{{ channel.unreadMessages }}</div>
              </div>
              <div>{{ channel.name }}</div>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styleUrl: './channel-section.scss',
})
export class ChannelSection {
  channels = signal<ChannelProps[]>([]);
}
