import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserProps } from '../types';
import { UserService } from '../services/user/user-service';
import { AuthService } from '../services/auth/auth-service';
import { filter, switchMap, take, tap } from 'rxjs';

export const friendsResolver: ResolveFn<UserProps[]> = () => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    filter((user): user is UserProps => !!user),
    take(1),
    switchMap(() => {
      const status = router.url.includes('/active') ? 'online' : undefined;
      
return userService.findFriends(status);
    }),
    tap((friends: UserProps[]) => {
      userService.activeUsers.set(friends);
    }),
  );
};
