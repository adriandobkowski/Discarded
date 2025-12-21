import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-message-footer',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  template: `
    <form action="">
      <footer>
        <div>
          <lucide-icon name="plus"></lucide-icon>
          <input type="file" formControlName="media" />
        </div>
        <div>
          <input type="text" placeholder="Write to {{ activeChat }}" />
        </div>
      </footer>
    </form>
  `,
  styleUrl: './message-footer.scss',
})
export class MessageFooter {
  messageForm = new FormGroup({
    input: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    media: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
  });
  activeChat: string = '';
}
