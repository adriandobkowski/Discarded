import { Component, inject } from '@angular/core';
import { LucideAngularModule, ContactRound, MessageCirclePlus } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user-service';

@Component({
  selector: 'app-root-navbar',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './root-navbar.html',
  styleUrl: './root-navbar.scss',
})
export class RootNavbarComponent {
  protected readonly ContactRound = ContactRound;
  protected readonly MessageCirclePlus = MessageCirclePlus;
  private userService = inject(UserService);
  protected isOpen = this.userService.addFriendIsOpen;
}
