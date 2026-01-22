import { FormControl } from '@angular/forms';
import { UserProps } from './user';

export interface MessageProps {
  readonly id: string;
  readonly userId: string;
  readonly roomId: string | null;
  readonly chatId: string | null;
  readonly message: string;
  readonly media: string | null;
  readonly createdAt: string;
}
export interface ExtendedMessageProps {
  readonly user: UserProps;
  readonly message: MessageProps;
}

export interface MessageForm {
  message: FormControl<string>;
  media: FormControl<string | null>;
}
