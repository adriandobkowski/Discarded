import { FormControl } from '@angular/forms';

export interface ChannelProps {
  readonly id?: string;
  readonly img: string;
  readonly name: string;
  readonly rooms: string[];
  readonly userIds: string[];
}
export interface ChannelForm {
  img: FormControl<string>;
  name: FormControl<string>;
}
