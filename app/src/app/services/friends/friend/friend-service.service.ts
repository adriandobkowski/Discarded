import { inject, Injectable, signal } from '@angular/core';
import { RouteService } from '../../route/route-service';
import { UserService } from '../../user/user-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private routeService = inject(RouteService);
  private userService = inject(UserService);

  protected currentRoute = this.routeService.currentRoute;

  public activeMenuUserId = signal<string | null>(null);

  public removeFriend(id: string): Observable<void> {
    return this.userService.removeFriend(id);
  }
}
