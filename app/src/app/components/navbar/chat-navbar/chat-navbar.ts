import { Component, inject } from '@angular/core';
import { LucideAngularModule, Phone, Search } from 'lucide-angular';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { ChatService } from '../../../services/chat/chat-service';
@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [LucideAngularModule, ProfileImageComponent],
  templateUrl: './chat-navbar.html',
  styleUrl: './chat-navbar.scss',
})
export class ChatNavbarComponent {
  protected readonly Phone = Phone;
  protected readonly Search = Search;
  private chatService = inject(ChatService);

  protected chattedWithUser = this.chatService.chattedWithUser;
}
