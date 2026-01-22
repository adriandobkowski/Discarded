import { Component, signal } from '@angular/core';
import { UserProps } from '../../../types/user';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';

@Component({
  selector: 'app-person-to-add',
  imports: [ProfileImageComponent],
  standalone: true,
  templateUrl: './person-to-add.html',
  styleUrl: './person-to-add.scss',
})
export class PersonToAddComponent {
  protected user = signal<UserProps | null>(null);
  protected selectedUsers: string[] = [];
  protected selectUser(username: string): void {
    this.selectedUsers = [...this.selectedUsers, username];
  }
}
