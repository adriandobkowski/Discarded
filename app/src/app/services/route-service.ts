import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private router = inject(Router);

  routerUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  currentRoute = computed(() => this.routerUrl());

  isChat = computed(() => this.routerUrl().startsWith('/chats'));
  isChannel = computed(() => this.routerUrl().startsWith('/channels'));
  isRoom = computed(() => this.routerUrl().includes('/rooms'));
}
