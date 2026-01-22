import { MessageProps } from './message';

export interface RoomProps {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly messages: MessageProps[];
}
