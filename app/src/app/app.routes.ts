import { Routes } from '@angular/router';
import { RootLayout } from './components/layouts/root-layout/root-layout';
import { FriendsPage } from './components/main/friends-page/friends-page';
import { NavbarAddFriend } from './components/main/navbar-add-friend/navbar-add-friend';

export const routes: Routes = [
  {
    path: '',
    component: RootLayout,
    children: [
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

  { path: '', redirectTo: 'active', pathMatch: 'full' },
];
