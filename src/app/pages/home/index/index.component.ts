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
  featureproduct: any;
  sellerproduct: any;
  services: any;
  blogproduct: any;
  recentproduct: any;
  currentRate: any = 4;
  selectedcategory: any;
  searchTerm: any;

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

    this.selectedcategory = 'All categories';
    this.featureproduct = feature;
    this.sellerproduct = seller;
    this.services = service;
    this.blogproduct = blog;
    this.recentproduct = recent;

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

  /**
   * Swiper setting
   */
  config = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          dots: true,
        },
      },
    ],
  };

  // Seller
  seller = {
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          dots: false,
        },
      },
    ],
  }

  // Blog
  blog = {

    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  //add product in cart
  addcart(id: any) {
    cart.push(this.featureproduct[id]);
  }

  //add product in favorite
  recentaddfavorite(id: any) {
    favorites.push(this.recentproduct[id]);
  }

  fetureaddfavorite(id: any) {
    favorites.push(this.featureproduct[id]);
  }

  selleraddfavorite(id: any) {
    favorites.push(this.sellerproduct[id]);
  }

  catchange(category: any) {
    this.selectedcategory = category;
  }

  teste() {
    
    // set decimal point to small and adjust to Angolan Kwanza format
    setTimeout(() => {
      document.querySelectorAll(".price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        let wholePart = txt[0];
        let decimalPart = txt.length > 1 ? txt[1] : '00'; // handling cases where there might be no decimal part
        // Format the number with commas for thousand separators
        wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // Combine whole part and decimal part with Angolan Kwanza symbol
        e.innerHTML = wholePart + "." + decimalPart + " AOA";
      });
    }, 0);
  }
}
