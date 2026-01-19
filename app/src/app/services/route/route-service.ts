import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private router = inject(Router);

  public routerUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  public currentRoute = computed(() => this.routerUrl());
  public messageDisabled = computed(
    () => this.currentRoute().includes('/channels') && !this.currentRoute().includes('/rooms'),
  );
  public isActiveRoute = computed(() => this.currentRoute().includes('/active'));
}
