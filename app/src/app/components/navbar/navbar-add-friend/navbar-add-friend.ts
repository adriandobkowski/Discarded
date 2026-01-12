import { Component, inject, signal } from '@angular/core';
import { Search } from '../../main/search/search';
import { UserService } from '../../../services/user/user-service';
import { UserProps } from '../../../types';

@Component({
  selector: 'app-navbar-add-friend',
  standalone: true,
  imports: [Search],
  template: `
    <div class="flex flex-col gap-4 w-4xl">
      <h2 class="text-lg font-semibold text-white p-2">Add friend</h2>
      <div class="flex gap-2 items-center">
        <app-search class="w-4xl" [(search)]="search" />

        <button
          (click)="sendFriendRequest(search())"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors whitespace-nowrap h-[42px] border border-transparent flex items-center justify-center"
        >
          Send friend request
        </button>
      </div>
    </div>
  `,
  styleUrl: './navbar-add-friend.scss',
})
export class NavbarAddFriend {
  private userService = inject(UserService);

  search = signal<string>('');

  sendFriendRequest(username: string): void {
    this.userService.sendFriendRequest(username).subscribe({
      next: (response: UserProps) => console.log(response),
      error: (err) => console.log(err),
    });
  }
}
