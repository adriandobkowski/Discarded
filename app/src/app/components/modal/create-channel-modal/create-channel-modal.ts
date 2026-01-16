import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Camera, LucideAngularModule, Plus, X } from 'lucide-angular';
import { ChannelService } from '../../../services/channel/channel-service';
import { ChannelProps } from '../../../types';
import { trimmedRequired } from '../../../validators/form-validators';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-create-channel-modal',
  standalone:true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './create-channel-modal.html',
  styleUrl: './create-channel-modal.scss',
})
export class CreateChannelModalComponent {
  protected readonly X = X;
  protected readonly Plus = Plus;
  protected readonly Camera = Camera;
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);

  protected channelForm = new FormGroup({
    img: new FormControl<string | null>(null),
    name: new FormControl<string>('', {
      validators: [(control) => Validators.required(control), trimmedRequired, Validators.minLength(3), Validators.maxLength(40)],
    }),
  });

  protected createChannelClicked = this.channelService.createChannelClicked;

  protected onSubmit(): void {
    if (this.channelForm.invalid) {
      this.channelForm.markAllAsTouched();
      
return;
    }
    this.channelService.createChannel(this.channelForm.getRawValue() as ChannelProps).subscribe({
      next:()=> {
        this.toastService.success("Successfully created channel");
      },
      error: (err)=> {
        this.toastService.errorFrom(err, "Failed to create channel");
      }
    });

    this.createChannelClicked.set(false);
  }
}
