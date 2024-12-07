import {HttpEvent, HttpInterceptorFn} from '@angular/common/http';
import {Observable} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
};
