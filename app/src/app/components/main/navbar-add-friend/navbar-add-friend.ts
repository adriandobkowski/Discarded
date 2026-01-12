import { Component, inject, signal } from '@angular/core';
import { Search } from '../search/search';
import { UserService } from '../../../services/user/user-service';
import { UserProps } from '../../../types';

@Component({
  selector: 'app-navbar-add-friend',
  standalone: true,
  imports: [Search],
  template: `
    <div class="flex flex-col gap-4 p-4">
      <h2 class="text-lg font-semibold text-white">Add friend</h2>
      <div class="flex gap-2">
        <app-search class="w-4xl" [(search)]="search" />

        <button
          (click)="sendFriendRequest(search())"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
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

  sendFriendRequest(id: string): void {
    this.userService.sendFriendRequest(id).subscribe({
      next: (response: UserProps) => console.log(response),
      error: (err) => console.log(err),
    });
  }
}
