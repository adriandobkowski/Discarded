import { Component, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Inbox, ContactRound, Settings, Handshake } from 'lucide-angular';
import { map } from 'rxjs';
import { ChannelProps } from '../../../types';
import { UserService } from '../../../services/user/user-service';

@Component({
  selector: 'app-root-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl:'./root-header.html',
  styleUrl: './root-header.scss',
})
export class RootHeaderComponent implements OnDestroy {
  protected readonly Inbox = Inbox;
  protected readonly ContactRound = ContactRound;
  protected readonly Settings = Settings;
  protected readonly Handshake = Handshake;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  protected activeElement: string = '';
  protected friendRequests: number | null = 5;
  protected channel: ChannelProps | null = null;

  protected inboxActive = this.userService.inboxActive;

  protected id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  public ngOnDestroy(): void {
    this.inboxActive.set(false);
  }
}
