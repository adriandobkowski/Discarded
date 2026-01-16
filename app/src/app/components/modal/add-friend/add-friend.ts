import { Component, computed, inject, input, signal } from '@angular/core';
import { UserProps } from '../../../types';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image';
import { Check, LucideAngularModule, X } from 'lucide-angular';
import { UserService } from '../../../services/user/user-service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { minSelected } from '../../../validators/form-validators';
import { ToastService } from '../../../services/toast/toast-service';
@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [ProfileImageComponent, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './add-friend.html',
  styleUrl: './add-friend.scss'
})
export class AddFriendComponent {
  protected readonly Check = Check;
  protected readonly X = X;
  public users = input<UserProps[]>();
  protected userService = inject(UserService);
  private toastService = inject(ToastService);

  protected search = signal<string>('');

  protected form = new FormGroup({
    selectedUserIds: new FormArray<FormControl<string>>([], {
      validators: [minSelected(2)],
    }),
  });

  protected get selectedUserIds(): FormArray<FormControl<string>> {
    return this.form.controls.selectedUserIds;
  }

  protected filteredUsers = computed(() => {
    const list = this.users() ?? [];
    const q = this.search().trim().toLowerCase();
    
return q.length === 0 ? list : list.filter((u) => u.username.toLowerCase().includes(q));
  });

  protected isSelected(userId: string): boolean {
    return this.selectedUserIds.value.includes(userId);
  }

  protected toggleUser(userId: string): void {
    const ids = this.selectedUserIds.value;
    const index = ids.indexOf(userId);

    if (index >= 0) {
      this.selectedUserIds.removeAt(index);
      
return;
    }

    this.selectedUserIds.push(new FormControl(userId, { nonNullable: true }));
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Select at least 2 friends', 'Invalid selection');
      
return;
    }

    const count = this.selectedUserIds.value.length;
    this.toastService.success(`Selected ${count} users`, 'Group ready');
    this.userService.addFriendIsOpen.set(false);
  }
}
