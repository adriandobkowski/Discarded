import { Component, input } from '@angular/core';
import { Status } from '../../../types';

@Component({
  selector: 'app-profile-image',
  imports: [],
  standalone: true,
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.scss',
})
export class ProfileImageComponent {
  public src = input<string>();
  public status = input<Status>();
}
