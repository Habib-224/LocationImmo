import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { MessageService } from '../services/message/message.service';
// import { AllservicesService } from '../services/allservices.service';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(
    private router: Router,
    private message: MessageService
  ) // private allServicesService: AllservicesService
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const useronline = JSON.parse(localStorage.getItem('userOnline') || '{}');
    const userstatut = useronline.user?.role;
    const userconnect = JSON.parse(localStorage.getItem('Userconnect') || '{}');

    if (userstatut === 'admin' && userconnect==true) {
      // this.router.navigate(['/dashboard_statistic']);
      return true;
    } else {
      this.message.MessageSucces(
        'error',
        'Oups',
        'Accès refusé : Vous n\'avez pas les autorisations nécessaires pour accéder à cette page',
        'center'
      );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
