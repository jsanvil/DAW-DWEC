import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { productIdGuard } from './guards/product-id.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { leavePageGuard } from './guards/leave-page.guard';
import { productResolver } from './resolvers/product.resolver';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    title: 'Inicio'
  },
  {
    path: 'products',
    component: ProductsListComponent,
    title: 'Listado de productos'
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    canActivate: [productIdGuard],
    resolve: {
      product: productResolver
    },
  },
  {
    path: 'products/edit/:id',
    canActivate: [productIdGuard],
    canDeactivate: [leavePageGuard],
    resolve: {
      product: productResolver
    },
    component: ProductEditComponent,
    title: 'Modificando producto'
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];
