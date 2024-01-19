import { CanActivateFn } from '@angular/router';
import { ApisService } from './services/apis.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApisService)
  if (localStorage.getItem('sellerData')) {
    return true;
  }
  return apiService.isSellerLoggedIn;
};
