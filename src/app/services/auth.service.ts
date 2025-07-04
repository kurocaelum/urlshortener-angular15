import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url: string = "http://localhost:8080";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getUsernameFromToken() {
    if(this.isAuthenticated()) {
      const token = localStorage.getItem('access_token')
      const jwtHelper = new JwtHelperService()
      return jwtHelper.decodeToken(token!).sub
    }
    return null
  }

  public findUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${username}`).pipe(
      res => res
    )
  }

  public register(payload: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.url}/auth/register`, payload).pipe(
      map(res => {
        alert("Cadastrado com sucesso!")
        return this.router.navigate([''])
      }), 
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha no cadastro. Tente novamente.")
      })
    )
  }

  public login(payload: { username: string, password: string }): Observable<any> {
    localStorage.removeItem('access_token')

    return this.http.post<{ token: string }>(`${this.url}/auth/login`, payload).pipe(
      map(res => {
        localStorage.setItem('access_token', res.token)
        
        return this.router.navigate(['/dashboard'])
      }),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403)
          return throwError(() => "Usuário ou senha incorretos")

        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao conectar com servidor")
      })
    )
  }

  public logout() {
    localStorage.removeItem('access_token')
    return this.router.navigate([''])
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    if(!token)
      return false
    const jwtHelper = new JwtHelperService()
    return !jwtHelper.isTokenExpired(token)
  }

  public findUrl(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/shorturls/${id}`).pipe(
      res => res,
      error => error
    )
  }

  public findUrlByShort(urlFrag: string): Observable<any> {
    return this.http.get<any>(`${this.url}/shorturls/source/${urlFrag}`).pipe(
      res => res,
      error => error
    )
  }

  public insertUrl(payload: {identifier: string, urlOriginal: string, userId: number}): Observable<any> {
    return this.http.post<any>(`${this.url}/shorturls`, payload).pipe(
      map(res => {
        window.location.reload()
      }),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao encurtar nova URL.")
      })
    )
  }

  public deleteUrl(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/shorturls/${id}`).pipe(
      map(res => {
        window.location.reload()
      }),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao encurtar nova URL.")
      })
    )
  }

  public updateUrl(payload: {
      id: number,
      identifier: string,
      urlOriginal: string,
      urlShortened: string,
      date: string
    }): Observable<any> {

    return this.http.put<any>(`${this.url}/shorturls/${payload.id}`, payload).pipe(
      map(res => {
        window.location.reload()
      }),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao editar URL.")
      })
    )
    
  }

}
