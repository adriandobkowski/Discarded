import { Component } from '@angular/core';
import { ChannelSectionComponent } from '../../section/channel-section/channel-section';
import { ChatSectionComponent } from '../../section/chat-section/chat-section';
import { RootHeaderComponent } from '../../header/root-header/root-header';
import { ProfileFooterComponent } from '../../footer/profile-footer/profile-footer';
import { RouterOutlet } from '@angular/router';
import { RootAsideComponent } from '../../aside/root-aside/root-aside';
import { RootNavbarComponent } from '../../navbar/root-navbar/root-navbar';
@Component({
  selector: 'app-root-layout',
  standalone: true,
  imports: [
    ChannelSectionComponent,
    ChatSectionComponent,
    RootHeaderComponent,
    RouterOutlet,
    ProfileFooterComponent,
    RootAsideComponent,
    RootHeaderComponent,
    RootNavbarComponent,
  ],
  templateUrl: './root-layout.html',
  styleUrl: './root-layout.scss',
})
export class RootLayoutComponent {}
