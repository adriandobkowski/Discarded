import { FormControl } from '@angular/forms';

export type Status = 'online' | 'busy' | 'offline';

export interface UserProps {
  readonly id: string;
  readonly img?: string;
  readonly username: string;
  readonly email: string;
  readonly status: Status;
  readonly friends: string[];
  readonly chats: string[];
  readonly channels: string[];
  readonly friendRequests: string[];
  readonly createdAt: string;
}
export interface ExtendedUserProps {
  readonly user: UserProps;
  readonly chatId?: string;
}
export interface UpdateForm {
  img: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
}
