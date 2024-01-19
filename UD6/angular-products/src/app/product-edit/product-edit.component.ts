import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { ComponentDeactivate } from '../guards/leave-page.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements ComponentDeactivate {
  product?: Product;
  areUnsavedChanges = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  canDeactivate() {
    if (this.areUnsavedChanges) {
      confirm('¿Quieres abandonar la página sin guardar los cambios?');
    }
    return true;
  }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
  }

  saveChanges() {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe({
        next: prod => {
          this.product = prod;
          this.areUnsavedChanges = false;
          this.router.navigate(['/products', this.product.id]);
        },
        error: err => console.error(err)
      });
    }
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!this.product) { return; }
    if (!fileInput.files || fileInput.files.length === 0) return;

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.product!.imageUrl = reader.result as string;
    });
  }
}