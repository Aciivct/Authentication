import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const service = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (service.isLoggedIn()) {
    if (route.url.length > 0) {
      let menu = route.url[0].path;
      if (menu == 'user') {
        if (service.getUserRole() == 'Admin') {
          return true;
        } else {
          toastr.warning('You dont have Access');
          router.navigate(['']);
          return false;
        }
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
    return true;
  }
  else {
    router.navigate(['login']);
    return false;
  }
};
