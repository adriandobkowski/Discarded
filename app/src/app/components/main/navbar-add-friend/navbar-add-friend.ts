import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-add-friend',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col gap-4 p-4">
      <h2 class="text-lg font-semibold text-white">Add friend</h2>
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="Enter username"
          class="flex-1 px-3 py-2  text-white rounded border border-slate-600 placeholder-slate-400 focus:outline-none focus:border-slate-500"
        />
        <button
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
        >
          Send friend request
        </button>
      </div>
    </div>
  `,
  styleUrl: './navbar-add-friend.scss',
})
export class NavbarAddFriend {}
