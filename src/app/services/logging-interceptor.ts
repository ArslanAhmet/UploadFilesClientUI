import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators'; // fancy pipe-able operators
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
       tap(
           response => console.log(`request${request}response${response}` ), 
           error => console.log("Something might be burning back there" + error)
       ));
  }
}