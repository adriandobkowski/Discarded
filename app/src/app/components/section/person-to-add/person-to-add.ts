import { Component, signal } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImage } from '../../profile/profile-image/profile-image';

@Component({
  selector: 'app-person-to-add',
  imports: [ProfileImage],
  template: `
    <div>
      <div>
        <app-profile-image [src]="user()?.img" />
        <div>{{ user()?.username }}</div>
      </div>
      <button (click)="selectUser(user()!.username)">
        <div></div>
      </button>
    </div>
  `,
  styleUrl: './person-to-add.scss',
})
export class PersonToAdd {
  user = signal<UserProps | null>(null);
  selectedUsers: string[] = [];
  selectUser(username: string): void {
    this.selectedUsers = [...this.selectedUsers, username];
  }
}
