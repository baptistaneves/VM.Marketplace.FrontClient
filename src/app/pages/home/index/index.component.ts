import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

// Data Get
import { feature, seller, service, blog, recent } from './data';
import { cart } from '../../cart/data';
import { favorites } from '../../account/favorites/data';
import { CategoryService } from 'src/app/services/categories/category.service';
import { Category } from 'src/app/models/categories/category';
import { environment } from 'src/environments/environment';
import { ProductDto } from 'src/app/models/products/productDto';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductFilter } from 'src/app/models/products/productFilter';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

// Index Component
export class IndexComponent implements OnInit {
  services: any;

  categories: Category[];
  productsDto: ProductDto[];
  productFilter = new ProductFilter();

  categoryImageUrlStaticFile: string = environment.apiUrlCategoryStaticFilesv1;
  productImageUrlStaticFile: string = environment.apiUrlProductStaticFilesv1;

  constructor(public router: Router,
              private categoryService: CategoryService,
              private productService: ProductService
              ) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    this.services = service;

    this.listCategories();
    this.listProducts(this.productFilter);
  }

  listProducts(filter: ProductFilter) {
    this.productService.getAll(filter).subscribe(response => {
      this.productsDto = response.data.items;
    })
  }

  listCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
    })
  }



}
