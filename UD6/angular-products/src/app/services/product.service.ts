import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
      return [{
        id: 1,
        description: 'WD BLACK SN770 2TB NVMe SSD',
        available: '2023-10-03',
        price: 115,
        imageUrl: 'assets/ssd.jpg',
        rating: 5
      }, {
        id: 2,
        description: 'MSI MPG B550 GAMING PLUS ',
        available: '2023-09-15',
        price: 139.90,
        imageUrl: 'assets/motherboard.png',
        rating: 4
      },
      {
        id: 3,
        description: 'Kingston FURY Beast DDR4 3200 MHz 16GB 2x8GB CL16',
        available: '2023-11-10',
        price: 42.95,
        imageUrl: 'assets/ram.png',
        rating: 3
      }];
  }
}
