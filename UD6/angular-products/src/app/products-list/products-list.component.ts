import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../interfaces/product';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductFilterPipe,
    ProductItemComponent,
    AddProductComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  title = 'Mi lista de productos';
  headers = {
    image: 'Imagen',
    description: 'Producto',
    price: 'Precio',
    available: 'Disponible',
    rating: 'Valoración'
  };

  products: Product[] = [];
  showImage = true;
  filterSearch = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        {
          next: responseProducts => this.products = responseProducts,
          error: err => console.error(err),
          complete: () => console.log('Productos obtenidos')
        }
      );
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  sortByDateAsc = false;

  sortByDate() {
    this.sortByDateAsc = !this.sortByDateAsc;

    this.products = [...this.products].sort((a: Product, b: Product) => {
      if (this.sortByDateAsc) {
        return a.available.localeCompare(b.available);
      }
      else {
        return b.available.localeCompare(a.available);
      }
    });
  }

}
