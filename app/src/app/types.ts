export type Status = 'online' | 'busy' | 'offline';
export interface UserProps {
  img?: string;
  username: string;
  status?: Status;
  
}
