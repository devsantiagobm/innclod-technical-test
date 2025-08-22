import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const sessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = !!localStorage.getItem('session');
  const requiresAuth = route.data['requiresAuth'] === true;

  if (requiresAuth && !isLoggedIn) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (!requiresAuth && isLoggedIn) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
