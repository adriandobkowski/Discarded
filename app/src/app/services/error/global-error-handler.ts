import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private toastService = inject(ToastService);

  public handleError(error: unknown): void {
    this.toastService.errorFrom(error, 'Unexpected error', 'App error');
  }
}
