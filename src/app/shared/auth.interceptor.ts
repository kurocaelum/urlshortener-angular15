import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token  = localStorage.getItem('access_token')

    if(token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // return next.handle(clonedRequest);
      return next.handle(clonedRequest).pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log(request.url, 'returned a response with status', event.status);
        }
      }));
    }

    console.log(`${request.url} not intercepted`)
    return next.handle(request);
  }
}
