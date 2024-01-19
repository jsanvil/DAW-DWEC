import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

export const productResolver: ResolveFn<Product> = (route, state) => {
  const router = inject(Router);
  const productsService = inject(ProductService);

  const id = route.params['id'];
  return productsService.getProduct(id).pipe(
    catchError(() => {
      router.navigate(['/products']);
      return EMPTY;
    })
  );  
};