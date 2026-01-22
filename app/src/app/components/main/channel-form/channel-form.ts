import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, LucideAngularModule, Plus, X } from 'lucide-angular';
import { AuthService } from '../../../services/auth/auth-service';
import { ChannelService } from '../../../services/channel/channel-service';
import { FileSaverService } from '../../../services/fileSaver/file-saver.service';
import { trimmedRequired } from '../../../validators/form-validators';
import { ChannelProps } from '../../../types/channel';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-channel-form',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, ProfileImageComponent],
  templateUrl: './channel-form.html',
  styleUrl: './channel-form.scss',
})
export class ChannelFormComponent implements OnInit {
  protected readonly X = X;
  protected readonly Plus = Plus;
  protected readonly Camera = Camera;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private channelService = inject(ChannelService);
  private toastService = inject(ToastService);
  private fileSaverService = inject(FileSaverService);
  private authService = inject(AuthService);

  protected user = this.authService.user;

  private editingId: string | null = null;

  protected channelForm = new FormGroup({
    img: new FormControl<string>('', { nonNullable: true }),
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

  public ngOnInit(): void {
    this.editingId = this.route.snapshot.paramMap.get('id');
    if (!this.editingId) {
      return;
    }

    this.channelService.findById().subscribe({
      next: (channel: ChannelProps) => {
        this.channelForm.patchValue({
          img: channel.img,
          name: channel.name,
        });
      },
      error: (err: unknown) => this.toastService.errorFrom(err, 'Could not load channel', 'Error'),
    });
  }

  protected get isEdit(): boolean {
    return !!this.editingId;
  }

  protected close(): void {
    if (this.editingId) {
      void this.router.navigate(['/channels', this.editingId]);

      return;
    }

    void this.router.navigateByUrl('/');
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files!;

    if (files.length === 0) {
      return;
    }

    this.fileSaverService.fileToBase64(files[0]).subscribe({
      next: (response: string) => {
        this.channelForm.patchValue({ img: response });
      },
      error: (err: unknown) => {
        this.toastService.errorFrom(err, "Couldn't upload image");
      },
    });
  }

  protected onSubmit(): void {
    if (this.channelForm.invalid) {
      this.channelForm.markAllAsTouched();
      this.toastService.error('Please fix validation errors', 'Invalid form');

      return;
    }

    if (this.editingId) {
      const patch = this.channelForm.getRawValue();
      this.channelService.updateChannel(this.editingId, patch).subscribe({
        next: () => {
          this.toastService.success('Channel updated');
          this.close();
        },
        error: (err: unknown) =>
          this.toastService.errorFrom(err, 'Failed to update channel', 'Update failed'),
      });

      return;
    }

    const currentUser = this.user();
    if (!currentUser) {
      this.toastService.error('Not authenticated');

      return;
    }

    const newChannel: ChannelProps = {
      ...this.channelForm.getRawValue(),
      rooms: [],
      userIds: [currentUser.id],
    };

    this.channelService.createChannelAndReturnChannel(newChannel).subscribe({
      next: (created: ChannelProps) => {
        this.toastService.success('Successfully created channel');
        void this.router.navigate(['/channels', created.id]);
      },
      error: (err: unknown) => {
        this.toastService.errorFrom(err, 'Failed to create channel', 'Create failed');
      },
    });
  }
}
