export type Status = 'online' | 'busy' | 'offline';
export interface UserProps {
  id: string;
  img?: string;
  username: string;
  status?: Status;
}
