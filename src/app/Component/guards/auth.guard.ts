import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router);

  const token = localStorage.getItem('token');

  if (token !== null) {
    return true //Allow Routing
  }else{
    _Router.navigate(['/login']);
    return false; // Prevent the user
  }

};
