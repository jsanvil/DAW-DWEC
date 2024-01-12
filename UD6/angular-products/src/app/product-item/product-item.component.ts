import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: '[app-product-item]',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input() product!: Product;
  @Input() showImage!: boolean;

  changeRating(rating: number) {
    this.product.rating = rating;
  }

  constructor() { }
}