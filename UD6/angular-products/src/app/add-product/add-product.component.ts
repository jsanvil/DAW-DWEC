import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Output() newProductEvent = new EventEmitter<Product>();

  newProduct = {
    id: null!,
    description: '',
    available: '',
    price: 0,
    imageUrl: '',
    rating: 0
  }

  constructor(private productService: ProductService) { }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: response => {
        this.newProductEvent.emit(this.newProduct);

        // se limpia el formulario asignando un nuevo objeto con datos por defecto
        this.newProduct = {
          id: null!,
          description: '',
          available: '',
          price: 0,
          imageUrl: '',
          rating: 0
        }
      },
      error: error => console.error(error)
    });
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newProduct.imageUrl = reader.result as string;
    });
  }
}
