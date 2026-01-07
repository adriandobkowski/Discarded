export type Status = 'online' | 'busy' | 'offline';

export interface UserProps {
  id: string;
  img?: string;
  username: string;
  status: Status;
  friends: string[];
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
  name: string;
  messages: MessageProps[];
}
export interface ChannelProps {
  img?: string;
  name: string;
  rooms: RoomProps[];
  userIds: string[];
}
