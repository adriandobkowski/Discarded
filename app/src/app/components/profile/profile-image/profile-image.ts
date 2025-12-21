import { Component, input } from '@angular/core';
import { Status } from '../../../types';

@Component({
  selector: 'app-profile-image',
  imports: [],
  template: `
    <div>
      <img [src]="src()" alt="Profile Image" />
      <div [attr.status]="status()"></div>
    </div>
  `,
  styleUrl: './profile-image.scss',
})
export class ProfileImage {
  src = input<string | string[]>();
  status = input<Status>();
}
