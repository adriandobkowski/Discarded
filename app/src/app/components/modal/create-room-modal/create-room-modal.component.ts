import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ChannelService } from '../../../services/channel/channel-service';
import { RoomService } from '../../../services/room/room-service';
import { trimmedRequired } from '../../../validators/form-validators';
import { ToastService } from '../../../services/toast/toast.service';
import { RoomForm } from '../../../types/room';

@Component({
  selector: 'app-create-room-modal',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './create-room-modal.component.html',
  styleUrl: './create-room-modal.component.scss',
})
export class CreateRoomModalComponent {
  protected readonly X = X;

  private channelService = inject(ChannelService);
  private roomService = inject(RoomService);
  private toastService = inject(ToastService);

  protected createRoomClicked = this.channelService.createRoomClicked;

  protected roomForm = new FormGroup<RoomForm>({
    name: new FormControl<string>('', {
      validators: [
        (control) => Validators.required(control),
        trimmedRequired,
        (control) => Validators.minLength(3)(control),
        (control) => Validators.maxLength(40)(control),
      ],
      nonNullable: true,
    }),
  });

  protected close(): void {
    this.createRoomClicked.set(false);
    this.roomForm.reset();
  }

  protected onSubmit(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();

      return;
    }

    const channelId = this.channelService.channelId();
    if (!channelId) {
      this.toastService.error('No channel selected');

      return;
    }

    const name = this.roomForm.controls.name.getRawValue();

    this.roomService.createRoom(name).subscribe({
      next: (updatedChannel) => {
        this.channelService.currentChannel.set(updatedChannel);
        this.toastService.success('Successfully created room');
        this.close();
      },
      error: (err) => {
        this.toastService.errorFrom(err, 'Failed to create room');
      },
    });
  }
}
