export type Status = 'online' | 'busy' | 'offline';

export interface UserProps {
  id: string;
  img?: string;
  username: string;
  email: string;
  status: Status;
  friends: string[];
  chats: string[];
  channels: string[];
  friendRequests: string[];
  createdAt: string;
}
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
export interface LoginProps {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  user: UserProps;
}
export interface MessageProps {
  id: string;
  userId: string;
  roomId: string | null;
  chatId: string | null;
  message: string;
  media: string | null;
  createdAt: string;
}

export interface RoomProps {
  id: string;
  name: string;
  type: string;
  messages: MessageProps[];
}
export interface ChannelProps {
  id?: string;
  img: string;
  name: string;
  rooms: string[];
  userIds: string[];
}
export interface ChatProps {
  id: string;
  userIds: string[];
  messages: MessageProps[];
}
export interface ExtendedUserProps {
  user: UserProps;
  chatId?: string;
}
export interface ExtendedMessageProps {
  user: UserProps;
  message: MessageProps;
}

export type FriendsStatusFilter = 'all' | 'online' | 'busy' | 'offline';

export type FriendsSortOption =
  | 'username-asc'
  | 'username-desc'
  | 'createdAt-desc'
  | 'createdAt-asc'
  | 'friendsCount-desc'
  | 'friendsCount-asc';
