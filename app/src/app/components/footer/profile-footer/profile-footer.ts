import { Component, inject } from '@angular/core';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import {
  HeadphoneOff,
  Headphones,
  LucideAngularModule,
  Mic,
  MicOff,
  Settings,
  Sun,
  Moon,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user-service';
import { AuthService } from '../../../services/auth/auth-service';
import { ThemeService } from '../../../services/theme/theme.service';
@Component({
  selector: 'app-profile-footer',
  standalone: true,
  imports: [ProfileImageComponent, LucideAngularModule, RouterLink],
  templateUrl: './profile-footer.html',
  styleUrl: './profile-footer.scss',
})
export class ProfileFooterComponent {
  protected readonly Mic = Mic;
  protected readonly Settings = Settings;
  protected readonly Headphones = Headphones;
  protected readonly HeadphoneOff = HeadphoneOff;
  protected readonly MicOff = MicOff;
  protected readonly Sun = Sun;
  protected readonly Moon = Moon;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private themeService = inject(ThemeService);

  protected statusModalOpen = this.userService.statusModalOpen;

  protected user = this.authService.user;

  protected theme = this.themeService.theme;

  protected microphoneActive = this.userService.microphoneActive;
  protected headphonesActive = this.userService.headphonesActive;

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
