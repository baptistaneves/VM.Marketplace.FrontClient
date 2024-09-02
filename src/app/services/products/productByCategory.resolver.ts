import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ProductService } from './product.service';
import { ProductDto } from 'src/app/models/products/productDto';


@Injectable({
  providedIn: 'root'
})
export class ProductByCategoryResolver implements Resolve<ProductDto> {
  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot){
    return this.productService.getById(route.params['name']);
  }
}