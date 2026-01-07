import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserProps } from '../types';
import { UserService } from '../services/user/user-service';
import { AuthService } from '../services/auth/auth-service';

export const friendsResolver: ResolveFn<UserProps[]> = () => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.user()!;

  const status = router.url.startsWith('/active') ? 'online' : null;

  return userService.findFriends(user.id, status);
};
