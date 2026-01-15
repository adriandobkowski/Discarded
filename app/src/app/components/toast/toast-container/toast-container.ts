import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../../services/toast/toast-service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="fixed right-4 top-4 z-[9999] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-2">
      @for (toast of toasts(); track toast.id) {
        <div
          class="rounded-lg border px-4 py-3 shadow-xl backdrop-blur-sm transition"
          [class.border-green-600]="toast.type === 'success'"
          [class.bg-green-950/80]="toast.type === 'success'"
          [class.border-red-600]="toast.type === 'error'"
          [class.bg-red-950/80]="toast.type === 'error'"
          [class.border-slate-500]="toast.type === 'info'"
          [class.bg-slate-900/80]="toast.type === 'info'"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              @if (toast.title) {
                <div class="text-sm font-semibold text-white">{{ toast.title }}</div>
              }
              <div class="text-sm text-slate-100/90 break-words">{{ toast.message }}</div>
            </div>
            <button
              type="button"
              class="text-slate-200/70 hover:text-slate-100 px-2 -mr-2"
              (click)="dismiss(toast.id)"
              aria-label="Dismiss toast"
            >
              ✕
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ToastContainer {
  private toastService = inject(ToastService);

  toasts = computed(() => this.toastService.toasts());

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
