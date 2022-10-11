import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {
        let auth= this.authService.isLoggedIn();
        if(auth) {
          return true;
        }else { 
        this.router.navigate(['login'],{queryParams: {returnUrl:state.url}});
        return false;
        }
      } 
        
  }