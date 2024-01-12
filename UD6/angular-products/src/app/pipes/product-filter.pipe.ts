import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], filterBy: string): Product[] {
    
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;

    if (filter) {
      return products.filter((product) => {
        return product.description.toLocaleLowerCase().includes(filter);
      });
    }

    return products;

  }

}
