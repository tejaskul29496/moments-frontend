import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if (token) {
            // If we have a token, we set it to the header
            request = request.clone({
                setHeaders: { 'x-access-token': token }
            });
        }

        return next.handle(request);
    }
}