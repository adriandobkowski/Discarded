import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { ChannelService } from '../../../services/channel/channel-service';

@Component({
  selector: 'app-message-footer',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  template: `
    <form action="" class="px-4 pb-6 pt-2">
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
            placeholder="Message {{ activeChat }}"
            disabled="{{ messageDisabled() }}"
            class="flex-1 bg-transparent text-gray-100 placeholder-gray-500 py-2.5 text-sm focus:outline-none transition-colors font-normal"
          />
        </div>
      </footer>
    </form>
  `,
  styleUrl: './message-footer.scss',
})
export class MessageFooter {
  readonly Plus = Plus;

  private channelService = inject(ChannelService);

  messageForm = new FormGroup({
    input: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    media: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
  });
  activeChat: string = '';

  messageDisabled = this.channelService.messageDisabled;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    if (files[0]) {
      this.messageForm.patchValue({ media: files[0] });
    }
  }
}
