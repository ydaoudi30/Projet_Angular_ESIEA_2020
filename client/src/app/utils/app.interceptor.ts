import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators'; 
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_alert';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    uuid = localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '';

    constructor(private router: Router,
                private messageService:AlertService, 
                private authService: AuthService) { 
        this.authService.uuidSubject.subscribe((res: string) => {
            console.log();
            this.uuid = res;
        }) 

        this.authService.tokenSubject.subscribe((res: string) => {
            this.token = res;
        })
    }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
        const authReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'X-Requested-With': 'XMLHttpRequest', 
                'uuid': this.uuid?this.uuid:'',
                "Authorization": `Bearer ${this.token}`
            }
        });


        return next.handle(authReq).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                       
                        if (event.status === 200) {
                            const body = event.body;
                            if (body instanceof Blob) {             
                                return event;
                            } else if (body.code === 401) {
                                if (this.token) {
                                    
                                    this.messageService.error('error');
                                } else { 

                                }
                            } else if (body.code !== 200) {
                                // this.message.error(body.msg);
                            }
                        }
                    }
                    return event;
                },
                event => {
                    if (event.status === 401) {
                        // this.message.error('eoor');
                        // const returnUrl = localStorage.getItem('returnUrl');
                        // if (returnUrl) {
                        //   window.location.replace(returnUrl);
                        // }
                    } else {
                        this.messageService.error('Http' + ' ---- httpCode:' + event.status);
                    }
                    return event;
                })
        );

    } 

}
