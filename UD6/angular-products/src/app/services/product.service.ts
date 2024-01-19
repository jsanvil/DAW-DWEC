import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Product } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  productsEndpoint = "products";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Array<Product>>(this.productsEndpoint)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            new Error(`Error obteniendo productos. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
        ));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsEndpoint}/${id}`)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            new Error(`Error obteniendo producto con 'id' ${id}. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
        ));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsEndpoint}/${product.id}`, product)
    .pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error modificando producto con 'id' ${product.id}. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // actualiza el rating de un producto
  // PATCH /products/:id { rating: number }
  updateRating(id: number, rating: number): Observable<Product> {
    return this.http.patch<Product>(`${this.productsEndpoint}/${id}`, { rating }).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al actualizar rating. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // agrega un producto
  // POST /products
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsEndpoint, product).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }



}
