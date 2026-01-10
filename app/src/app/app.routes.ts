import { Routes } from '@angular/router';
import { RootLayout } from './components/layouts/root-layout/root-layout';
import { FriendsPage } from './components/friends/friends-page/friends-page';
import { NavbarAddFriend } from './components/main/navbar-add-friend/navbar-add-friend';
import { authGuard } from '../guards/guard';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { authenticatedGuard } from '../guards/authenticatedGuard';
import { friendsResolver } from './resolvers/friendsResolver';
import { Settings } from './components/settings/settings';
import { Message } from './components/main/message/message';
import { ChatLayout } from './components/layouts/chat-layout/chat-layout';
import { ChannelLayout } from './components/layouts/channel-layout/channel-layout';
import { ChannelMessage } from './components/main/channel-message/channel-message';

export const routes: Routes = [
  { path: 'login', component: Login, canMatch: [authenticatedGuard] },
  { path: 'register', component: Register, canMatch: [authenticatedGuard] },

  {
    path: '',
    component: RootLayout,
    canMatch: [authGuard],
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },

      {
        path: 'active',
        component: FriendsPage,
        resolve: {
          friends: friendsResolver,
        },
      },
      {
        path: 'all',
        component: FriendsPage,
        resolve: {
          friends: friendsResolver,
        },
      },
      {
        path: 'add-friend',
        component: NavbarAddFriend,
      },
      {
        path: 'settings',
        component: Settings,
      },
    ],
  },

  { path: 'chats', component: ChatLayout, children: [{ path: ':id', component: Message }] },
  {
    path: 'channels',
    component: ChannelLayout,
    children: [{ path: ':id', component: ChannelMessage }],
  },
];
