import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
constructor(private authService : AuthService) {}
// intercept(request: HttpRequest<unknown>, next: HttpHandler):
// Observable<HttpEvent<unknown>> {
// let jwt = this.authService.getToken();
// let reqWithToken = request.clone( {
// setHeaders: { Authorization : "Bearer "+jwt}
// } )
// return next.handle(reqWithToken);
// }
// }


intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  const g = "/login";
  const r ="/register"
  const v ="/verifEmail"
  if(request.url.search(g) === -1&&request.url.search(r) === -1&&request.url.search(v) === -1){
    let jwt = this.authService.getToken();
  let reqWithToken = request.clone( {
  setHeaders: { Authorization : "Bearer "+jwt}
  })
  return next.handle(reqWithToken);
  }
  return next.handle(request);
}
}