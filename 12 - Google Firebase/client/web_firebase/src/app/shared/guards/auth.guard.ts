import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const r = inject(Router);
  return inject(AuthService).checkAuth().then((user) => {
    if (!user) {
      // navigation
      r.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }).catch(error => {
    console.log(error);
    r.navigateByUrl('/login');
    return false;
  });
};
