import { Component, input } from '@angular/core';
import { Status } from '../../../types';
import { LucideAngularModule, CircleUserRound } from 'lucide-angular';

@Component({
  selector: 'app-profile-image',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.scss',
})
export class ProfileImageComponent {
  protected readonly CircleUserRound = CircleUserRound;

  public src = input<string>();
  public status = input<Status>();
}
