import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProps } from '../../types';
import { url } from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  findById(id: string): Observable<HttpResponse<UserProps>> {
    return this.http.get<UserProps>(`${url}/${id}`, { observe: 'response' });
  }
}
