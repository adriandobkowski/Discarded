import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { WebSocketService } from '../../../services/ws/web-socket-service';
import { ExtendedMessageProps, MessageProps, UserProps } from '../../../types';
import { RouteService } from '../../../services/route/route-service';
import { AuthService } from '../../../services/auth/auth-service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-message-footer',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  template: `
    <form [formGroup]="messageForm" class="px-4 pb-6 pt-2" (ngSubmit)="send()">
      <footer class="flex items-center">
        <div class="relative flex items-center bg-[#383A40] rounded-lg w-full">
          <label
            class="px-4 py-2.5 text-gray-400 hover:text-white cursor-pointer transition-colors flex-shrink-0"
          >
            <div class="bg-[#2B2D31] rounded-full p-0.5">
              <lucide-icon [img]="Plus" class="w-4 h-4" />
            </div>
            <input type="file" accept="image/*, video/*" hidden (change)="onFileSelected($event)" />
          </label>
          <input
            type="text"
            placeholder="Message"
            [disabled]="messageDisabled()"
            class="flex-1 bg-transparent text-gray-100 placeholder-gray-500 py-2.5 text-sm focus:outline-none transition-colors font-normal"
          />
          <button type="submit" hidden></button>
        </div>
      </footer>
    </form>
  `,
  styleUrl: './message-footer.scss',
})
export class MessageFooter {
  readonly Plus = Plus;

  private authService = inject(AuthService);
  private webSocketService = inject(WebSocketService);
  private routeService = inject(RouteService);

  messageDisabled = this.routeService.messageDisabled;

  messageForm = new FormGroup({
    id: new FormControl<string>(''),
    user: new FormControl<UserProps | null>(null, {
      validators: [Validators.required],
    }),
    input: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    media: new FormControl<string | null>(null),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    if (files[0]) {
      const fileUrl = `/assets/uploads/${files[0].name}`;
      this.messageForm.patchValue({ media: fileUrl });
    }
  }
  send(): void {
    const message: ExtendedMessageProps = {
      message: {
        ...this.messageForm.value,
        id: uuidv4(),
      } as MessageProps,
      user: this.authService.user()!,
    };
    this.webSocketService.send(message);
  }
}
