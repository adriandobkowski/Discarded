import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="bg-black w-screen h-8 flex">
      <div class="flex items-center justify-evenly w-7xl ">
        <img src="" alt="" />
        <div class="text-white">test</div>
      </div>
      <!-- <div>{{ activeElement }}</div> -->
      <button (click)="inboxActive = !inboxActive" class="w-max bg-white">
        <img src="" alt="" />
        <div>Inbox</div>
      </button>
      @if (inboxActive) {
        <div class="absolute w-xl h-xl  bg-black inset-64 text-white">
          <header>
            <img src="" alt="" />
            <h2>Inbox</h2>
            <a [routerLink]="['invitations']">
              <img src="" alt="" />
              <div>{{ friendRequests }}</div>
            </a>
          </header>
          <nav class="flex justify-evenly">
            <button>For you</button>
            <button>Unread messages</button>
            <button>Tags</button>
          </nav>
        </div>
      }
    </nav>
  `,
  styleUrl: './navbar.scss',
})
export class Navbar {
  activeElement: string = '';
  inboxActive: boolean = false;
  friendRequests: number | null = null;
}
