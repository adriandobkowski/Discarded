import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
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
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatService);

  protected chattedWithUser = this.chatService.chattedWithUser;

  protected id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
}
