import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from './authorize.service';
import { tap } from 'rxjs/operators';
import { ApplicationPaths, QueryParameterNames } from './api-authorization.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) {
    }
    private granted_roles: string[] = [];

  canActivate(
    _next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let roles = _next.data['permittedRoles'] as Array<string>;
      var isAuth = this.authorize.isAuthenticated()
          .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)));
      this.authorize.getRoles().subscribe(result => {
          if (Array.isArray(result))
              this.granted_roles = result;
          else
              this.granted_roles[0] = result;
      });
      if (isAuth) {
          if (roles) {
              var isMatch = false;
              roles.forEach(role => {
                  this.granted_roles.forEach(granted_role => {
                      console.log(role);
                      console.log(granted_role);
                      console.log(granted_role == role);
                      if (granted_role == role) {
                          isMatch = true;
                      }
                  });
              });
              if (!isMatch && this.granted_roles.length!=0)
                  alert("You don't have a right to access this page");
              return isMatch;
          }
      }
      else {
          return isAuth;
      }
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      this.router.navigate(ApplicationPaths.LoginPathComponents, {
        queryParams: {
          [QueryParameterNames.ReturnUrl]: state.url
        }
      });
    }
  }
}
