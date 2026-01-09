import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ChannelProps, UserProps } from '../../types';
import { url } from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private http = inject(HttpClient);

  findAll(id: string): Observable<ChannelProps[]> {
    return this.http.get<UserProps>(`${url}/users/${id}`).pipe(
      map((user: UserProps) => user.channels),
      switchMap((channelIds: string[]) => {
        if (channelIds.length === 0) {
          return of([]);
        }
        return forkJoin(
          channelIds.map((channelId: string) => {
            return this.http.get<ChannelProps>(`${url}/channels/${channelId}`);
          }),
        );
      }),
    );
  }
}
