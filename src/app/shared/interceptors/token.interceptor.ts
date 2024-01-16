import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, finalize, Observable, tap, throwError } from "rxjs";
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import { AppLoaderService } from "../services/app-loader/app-loader.service";
import { ToasterService } from "../services/toaster/toaster.service";
import { urlConstants } from "../constants/api-constants";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtAuth: JwtAuthService,
    private loader: AppLoaderService,
    private toaster: ToasterService
    ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.jwtAuth.token || this.jwtAuth.getJwtToken();
    var changedReq;
    const skipLoading = req.url.includes(urlConstants.location);
    if (!skipLoading) {
      setTimeout(() => {
        this.loader.open();
      });
    }
    if (token) {
      changedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
    } else {
      changedReq = req;
    }
    return next.handle(changedReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.toaster.show('error', error.statusText, error?.error?.message, 6000);
          if (error.status === 401) {
            this.jwtAuth.navigateToSignInOnLogout();
          }
        }
        return throwError(() => error);
      }),
      tap((event: HttpEvent<any>) =>  {
        if (event instanceof HttpResponse) {
          if (req.url.includes(urlConstants.logout)) {
            this.jwtAuth.publishNotifications([]);
          } else if (event?.body?.notify && event?.body?.notify?.length > 0) {
            this.jwtAuth.publishNotifications(event?.body?.notify);
          }
          if(req.method === 'POST' && req.url.includes(urlConstants.officeWorkTime)) {
            this.toaster.show('success', event.statusText, event?.body?.message, 30000);
          } else if (req.method !== 'GET' && !skipLoading) {
            this.toaster.show('success', event.statusText, event?.body?.message, 5000);
          }
          if (event.status === 401) {
            this.jwtAuth.navigateToSignInOnLogout();
          }
        }
      }),
      finalize(() => {
        this.loader.close();
      })
    );
  }
}

