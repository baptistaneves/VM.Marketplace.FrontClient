import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

//Data Get
import { product } from './data';
import { CategoryService } from './category.service';
import { CategoryModel } from './category.model';
import { cart } from '../cart/data';
import { ProductFilter } from 'src/app/models/products/productFilter';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductDto } from 'src/app/models/products/productDto';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryService, DecimalPipe]
})

// Category Component
export class CategoryComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  products: any;
  selectedCategory: any;
  itemicon: any;
  isDesc: boolean = false;

  // Table data
  CategoryList!: Observable<CategoryModel[]>;
  total: Observable<number>;

  productFilter = new ProductFilter();
  productsDto: ProductDto[];
  categoryDescription: string;

  productImageUrlStaticFile: string = environment.apiUrlProductStaticFilesv1;

  constructor(public service: CategoryService,
              private route: ActivatedRoute,
              private productService: ProductService
             ) {
    this.CategoryList = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.categoryDescription = params['name'];
    });

    this.productFilter.category = this.categoryDescription;

    this.listProducts(this.productFilter);

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //Fethch Data
    this.products = product
    this.selectedCategory = 'Todos'
    this.itemicon = 'thumb-up'

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Categorias' },
      { label: this.categoryDescription, active: true }
    ];

    /**
    * fetches data
    */
    setTimeout(() => {
      this.CategoryList.subscribe(x => {
        this.products = Object.assign([], x);
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200)

   // set decimal point to small and adjust to Angolan Kwanza format
    setTimeout(() => {
      document.querySelectorAll(".price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        let wholePart = txt[0];
        let decimalPart = txt.length > 1 ? txt[1] : '00'; // handling cases where there might be no decimal part
        // Format the number with commas for thousand separators
        wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // Combine whole part and decimal part with Angolan Kwanza symbol
        e.innerHTML = wholePart + ",<small>" + decimalPart + "</small> Kz";
      });
    }, 0);
    
  }

  listProducts(filter: ProductFilter) {
    this.productService.getAll(filter).subscribe(response => {
      this.productsDto = response.data.items;
    })
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.productFilter.searchTerm = value;
    this.productFilter.category = this.categoryDescription;

    this.listProducts(this.productFilter)
  }

  //filter dropdown
  Changecategory(item: any, icon: any, property: any) {
    this.selectedCategory = item
    this.itemicon = icon
    this.isDesc = !this.isDesc; //change the direction 
    let direction = this.isDesc ? 1 : -1;
    this.service.products.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }

  //add to cart 
  addcart(id: any) {
    cart.push(this.products[id])
  }
}
