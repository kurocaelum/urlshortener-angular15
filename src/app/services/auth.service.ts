import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public login(payload: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.url}/auth/login`, payload).pipe(
      map(data => {
        console.log(data)
      }),
      catchError(err => {
        // console.log(err)
        return throwError(() => err.error.message)
      })
    )
  }

}
