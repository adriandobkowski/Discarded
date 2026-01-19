import { Component, inject, OnInit } from '@angular/core';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ContactRound } from 'lucide-angular';
import { UserService } from '../../../services/user/user-service';
import { ExtendedUserProps } from '../../../types';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [ProfileImageComponent, RouterLink, LucideAngularModule],
  templateUrl: './chat-section.html',
  styleUrl: './chat-section.scss',
})
export class ChatSectionComponent implements OnInit {
  protected readonly ContactRound = ContactRound;
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  protected chattedWithFriends: ExtendedUserProps[] = [];

  protected isOpen = this.userService.addFriendIsOpen;

  public ngOnInit(): void {
    this.userService.findChattedWithUsers().subscribe({
      next: (response: ExtendedUserProps[]) => {
        this.chattedWithFriends = response;
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Could not load chats', 'Error');
      },
    });
  }
}
