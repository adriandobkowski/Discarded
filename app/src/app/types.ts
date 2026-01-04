export type Status = 'online' | 'busy' | 'offline';

export interface UserProps {
  id: string;
  img?: string;
  username: string;
  status?: Status;
  createdAt: Date;
}
export interface MessageProps {
  id: string;
  user: UserProps;
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
  users: UserProps[];
}
