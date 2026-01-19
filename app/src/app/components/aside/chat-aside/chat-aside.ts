import { Component, inject } from '@angular/core';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { ChatService } from '../../../services/chat/chat-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-aside',
  standalone: true,
  imports: [ProfileImageComponent, DatePipe],
  templateUrl: './chat-aside.html',
  styleUrl: './chat-aside.scss',
})
export class ChatAsideComponent {
  private chatService = inject(ChatService);
  protected chattedWithUser = this.chatService.chattedWithUser;
}
