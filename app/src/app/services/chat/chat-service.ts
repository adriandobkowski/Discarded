import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MessageProps, UserProps } from '../../types';
import { url } from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);

  // findAll(id: string): Observable<UserProps[]> {
  //   return this.http.get<MessageProps[]>(`${url}/messages/${id}`).pipe(map((message) => {

  //   }));
  // }
}
