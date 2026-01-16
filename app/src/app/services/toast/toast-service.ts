import { Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  createdAt: number;
  durationMs: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultDurationMs = 3500;

  public toasts = signal<Toast[]>([]);

  protected show(partial: Omit<Toast, 'id' | 'createdAt'> & { id?: string; createdAt?: number }): string {
    const id = partial.id  ?? `${Date.now()}-${Math.random()}`;

    const toast: Toast = {
      id,
      type: partial.type,
      title: partial.title,
      message: partial.message,
      createdAt: partial.createdAt ?? Date.now(),
      durationMs: this.defaultDurationMs,
    };

    this.toasts.update((list) => [...list, toast]);

    window.setTimeout(() => {
      this.dismiss(id);
    }, toast.durationMs);

    return id;
  }

  public success(message: string, title?: string, durationMs?: number): string {
    return this.show({ type: 'success', title, message, durationMs: durationMs ?? this.defaultDurationMs });
  }

  public error(message: string, title?: string, durationMs?: number): string {
    return this.show({ type: 'error', title, message, durationMs: durationMs ?? 6000 });
  }

  public errorFrom(error: unknown, fallbackMessage: string, title?: string, durationMs?: number): string {
    const detail = this.formatErrorDetail(error);
    const message = detail ? `${fallbackMessage}: ${detail}` : fallbackMessage;
    
return this.error(message, title, durationMs);
  }

  public info(message: string, title?: string, durationMs?: number): string {
    return this.show({ type: 'info', title, message, durationMs: durationMs ?? this.defaultDurationMs });
  }

  public dismiss(id: string): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  protected clear(): void {
    this.toasts.set([]);
  }

  private formatErrorDetail(error: unknown): string | null {
    if (!error) return null;

    if (error instanceof HttpErrorResponse) {
      const statusPart = error.status ? `HTTP ${error.status}` : 'HTTP error';
      const serverMessage: unknown = error.error;
      const trimmed = (serverMessage as string).trim();
      
  return trimmed ? `${statusPart} - ${trimmed}` : statusPart;
    }

    return null;
} 
}
