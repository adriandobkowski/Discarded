import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-message-footer',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  template: `
    <form action="" class="px-2">
      <footer class="flex items-center">
        <div
          class="relative flex items-center bg-slate-800 border border-slate-700 rounded-lg w-full"
        >
          <label
            class="px-4 py-2 text-slate-400 hover:text-white cursor-pointer transition-colors flex-shrink-0"
          >
            <lucide-icon [img]="Plus" class="w-6 h-6" />
            <input type="file" accept="image/*, video/*" hidden (change)="onFileSelected($event)" />
          </label>
          <input
            type="text"
            placeholder="Write to {{ activeChat }}"
            class="flex-1 bg-slate-800 text-white placeholder-slate-500 py-2   focus:outline-none transition-colors "
          />
        </div>
      </footer>
    </form>
  `,
  styleUrl: './message-footer.scss',
})
export class MessageFooter {
  readonly Plus = Plus;
  messageForm = new FormGroup({
    input: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    media: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
  });
  activeChat: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    if (files[0]) {
      this.messageForm.patchValue({ media: files[0] });
    }
  }
}
