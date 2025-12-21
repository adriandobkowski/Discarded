import { Component } from '@angular/core';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { signal } from '@angular/core';
import { Status } from '../../../types';
import { RouterLink } from '@angular/router';
interface ChatProps {
  id: string;
  status?: Status;
  users: {
    img?: string;
    name: string;
  }[];
}

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [ProfileImage, RouterLink],
  template: `
    <section>
      <header>
        <input type="text" placeholder="Find or start a conversation" />
      </header>
      <nav>
        <img src="" alt="" />
        <div>Friends</div>
      </nav>
      <div>
        <div>
          <div>Private messages</div>
          <button>
            <img src="" alt="" />
          </button>
        </div>
        <main>
          @for (chat of chats(); track chat.id) {
            <a [routerLink]="['messages', chat.id]">
              <div>
                @for (user of chat.users; track user.name) {
                  <app-profile-image [src]="user.img" [status]="chat.status" />
                  <div>
                    <div>{{ user.name }}</div>
                    @if (chat.users.length > 1) {
                      <div>{{ chat.users.length }} members</div>
                    }
                  </div>
                }
              </div>
            </a>
          }
        </main>
      </div>
    </section>
  `,
  styleUrl: './chat-section.scss',
})
export class ChatSection {
  chats = signal<ChatProps[]>([]);
  isArray = Array.isArray;
}
