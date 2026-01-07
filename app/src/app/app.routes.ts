import { Routes } from '@angular/router';
import { RootLayout } from './components/layouts/root-layout/root-layout';
import { FriendsPage } from './components/main/friends-page/friends-page';
import { NavbarAddFriend } from './components/main/navbar-add-friend/navbar-add-friend';
import { authGuard } from '../guard';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: RootLayout,
    canMatch: [authGuard],
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },

      {
        path: 'active',
        component: FriendsPage,
      },
      {
        path: 'all',
        component: FriendsPage,
      },
      {
        path: 'add-friend',
        component: NavbarAddFriend,
      },
    ],
  },
];
