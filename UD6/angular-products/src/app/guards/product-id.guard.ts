import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const productIdGuard: CanActivateFn = (route, state) => {
    // obtiene el servicio Router
    const router = inject(Router);

    // obtiene el parámetro de ruta 'id'
    const id = route.params['id'];
  
    // si el id no es un número válido, redirige a la lista de productos
    if (isNaN(id) || id < 1) {
      return router.createUrlTree(['/products']);
    }
  
    return true;
};
