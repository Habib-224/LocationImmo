import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  router.navigate(['accueil']);
  return true;
};
