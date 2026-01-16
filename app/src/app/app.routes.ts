import { Routes } from '@angular/router';
import {  RootLayoutComponent } from './components/layouts/root-layout/root-layout';
import { FriendsPage } from './components/main/friends-page/friends-page';
import { NavbarAddFriendComponent } from './components/navbar/navbar-add-friend/navbar-add-friend';
import { authGuard } from '../guards/guard';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { authenticatedGuard } from '../guards/authenticatedGuard';
import { friendsResolver } from './resolvers/friendsResolver';
import { SettingsComponent } from './components/settings/settings';
import { ChatLayoutComponent } from './components/layouts/chat-layout/chat-layout';
import { ChannelLayoutComponent } from './components/layouts/channel-layout/channel-layout';
import { ChannelMessageComponent } from './components/main/channel-message/channel-message';
import { PageNotFoundComponent } from './components/main/page-not-found/page-not-found';
import { RoomMessageComponent } from './components/main/room-message/room-message';
import { ChatMessageComponent } from './components/main/chat-message/chat-message';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canMatch: [authenticatedGuard] },
  { path: 'register', component: RegisterComponent, canMatch: [authenticatedGuard] },

  {
    path: '',
    component: RootLayoutComponent,
    canMatch: [authGuard],
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },

      {
        path: 'active',
        component: FriendsPage,
        resolve: {
          friendsInput: friendsResolver,
        },
      },
      {
        path: 'all',
        component: FriendsPage,
        resolve: {
          friendsInput: friendsResolver,
        },
      },
      {
        path: 'add-friend',
        component: NavbarAddFriendComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },

  {
    path: 'chats',
    component: ChatLayoutComponent,
    children: [{ path: ':id', component: ChatMessageComponent }],
    canMatch: [authGuard],
  },
  {
    path: 'channels',
    component: ChannelLayoutComponent,
    children: [
      { path: ':id', component: ChannelMessageComponent },
      { path: ':id/rooms/:roomId', component: RoomMessageComponent },
    ],
    canMatch: [authGuard],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
