import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Camera, LucideAngularModule, Plus, X } from 'lucide-angular';
import { ChannelService } from '../../../services/channel/channel-service';
import { ChannelProps } from '../../../types';
import { trimmedRequired } from '../../../validators/form-validators';
import { ToastService } from '../../../services/toast/toast-service';
import { FileSaverService } from '../../../services/fileSaver/file-saver.service';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-create-channel-modal',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, ProfileImageComponent],
  templateUrl: './create-channel-modal.html',
  styleUrl: './create-channel-modal.scss',
})
export class CreateChannelModalComponent {
  protected readonly X = X;
  protected readonly Plus = Plus;
  protected readonly Camera = Camera;
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);
  private fileSaverService = inject(FileSaverService);
  private authService = inject(AuthService);

  protected user = this.authService.user;

  protected channelForm = new FormGroup({
    img: new FormControl<string>('', {
      nonNullable: true,
    }),
    name: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        Validators.minLength(3),
        Validators.maxLength(40),
      ],
      nonNullable: true,
    }),
  });

  protected createChannelClicked = this.channelService.createChannelClicked;

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    this.fileSaverService.fileToBase64(files[0]).subscribe({
      next: (response: string) => {
        this.channelForm.patchValue({ img: response });
      },
      error: (err) => {
        this.toastService.errorFrom(err, "Couldn't upload image");
      },
    });
  }

  protected onSubmit(): void {
    if (this.channelForm.invalid) {
      this.channelForm.markAllAsTouched();

      return;
    }
    const newChannel: ChannelProps = {
      ...this.channelForm.getRawValue(),
      rooms: [],
      userIds: [this.user()!.id],
    };
    this.channelService.createChannel(newChannel).subscribe({
      next: () => {
        this.toastService.success('Successfully created channel');
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Failed to create channel');
      },
    });

    this.createChannelClicked.set(false);
  }
}
