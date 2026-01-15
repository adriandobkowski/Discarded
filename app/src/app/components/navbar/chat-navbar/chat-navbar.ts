import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LucideAngularModule, Phone, Search } from 'lucide-angular';
import { ProfileImage } from '../../profile/profile-image/profile-image';
import { ChatService } from '../../../services/chat/chat-service';
@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [LucideAngularModule, ProfileImage],
  template: `
    <nav
      class="bg-[#313338] h-12 w-full flex items-center justify-between border-b border-[#1F2023] shadow-md pl-4 pr-4"
    >
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center">
          <app-profile-image [src]="chattedWithUser()?.img" class="transform scale-75" />
        </div>
        <div class="text-white font-bold text-base line-clamp-1">
          {{ chattedWithUser()?.username }}
        </div>
      </div>

      <div class="flex items-center gap-6">
        <div class="cursor-pointer text-gray-400 hover:text-gray-200" title="Start Call">
          <lucide-icon [img]="Phone" class="w-6 h-6" />
        </div>
        <div
          class="bg-[#1E1F22] rounded flex items-center px-2 py-0.5 transition-all focus-within:w-64 w-36"
        >
          <input
            type="text"
            [placeholder]="'Search ' + (chattedWithUser()?.username || '')"
            class="truncate bg-transparent border-none outline-none text-gray-200 text-sm h-6 w-full placeholder-gray-400"
          />
          <lucide-icon [img]="Search" class="w-4 h-4 text-gray-400 ml-1" />
        </div>
      </div>
    </nav>
  `,
  styleUrl: './chat-navbar.scss',
})
export class ChatNavbar {
  readonly Phone = Phone;
  readonly Search = Search;

  private route = inject(ActivatedRoute);
  private chatService = inject(ChatService);
  
  chattedWithUser = this.chatService.chattedWithUser;

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
}
