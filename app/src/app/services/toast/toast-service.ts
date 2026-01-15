import { Injectable, signal } from '@angular/core';

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

  toasts = signal<Toast[]>([]);

  show(partial: Omit<Toast, 'id' | 'createdAt'> & { id?: string; createdAt?: number }): string {
    const id = partial.id ?? (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`);

    const toast: Toast = {
      id,
      type: partial.type,
      title: partial.title,
      message: partial.message,
      createdAt: partial.createdAt ?? Date.now(),
      durationMs: partial.durationMs ?? this.defaultDurationMs,
    };

    this.toasts.update((list) => [...list, toast]);

    window.setTimeout(() => {
      this.dismiss(id);
    }, toast.durationMs);

    return id;
  }

  success(message: string, title?: string, durationMs?: number): string {
    return this.show({ type: 'success', title, message, durationMs: durationMs ?? this.defaultDurationMs });
  }

  error(message: string, title?: string, durationMs?: number): string {
    return this.show({ type: 'error', title, message, durationMs: durationMs ?? 6000 });
  }

  info(message: string, title?: string, durationMs?: number): string {
    return this.show({ type: 'info', title, message, durationMs: durationMs ?? this.defaultDurationMs });
  }

  dismiss(id: string): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }
}
