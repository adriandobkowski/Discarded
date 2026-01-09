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
  createdAt: Date;
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
  message: string;
  createdAt: Date;
}
export interface RoomProps {
  id: string;
  name: string;
  messages: MessageProps[];
}
export interface ChannelProps {
  id: string;
  img?: string;
  name: string;
  rooms: string[];
  userIds: string[];
}
export interface ChatProps {
  id: string;
  userIds: string[];
  messages: MessageProps[];
}
export interface ExtendedChatProps {
  user: UserProps;
  chatId: string;
}
