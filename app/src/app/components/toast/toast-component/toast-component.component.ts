import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../../services/toast/toast-service';
@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.component.html',
  styleUrl: './toast-component.component.scss',
})
export class ToastComponentComponent {
  private toastService = inject(ToastService);

  protected toasts = computed(() => this.toastService.toasts());

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
