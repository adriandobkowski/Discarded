import { MessageProps } from './message';

export interface ChatProps {
  readonly id: string;
  readonly userIds: string[];
  readonly messages: MessageProps[];
}
