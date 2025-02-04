import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

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

  pagination: any;
  private _total$ = new BehaviorSubject<number>(0);
  
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
  }

  listProducts(filter: ProductFilter) {
    this.productService.getAll(filter).subscribe(response => {
      this.productsDto = response.data.items;
      this.pagination = response.data;
      this._total$.next(response.data.totalItems);
      filter.filterByHighPrice = false;
      filter.filterByLowPrice = false;
    })
  }

  get total$() { return this._total$.asObservable(); }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.productFilter.searchTerm = value;
    this.productFilter.category = this.categoryDescription;

    this.listProducts(this.productFilter)
  }

  //filter dropdown
  Changecategory(item: any, icon: any, property: any) {
    this.selectedCategory = item;
  }

  paginate(pageNumber: number) {
    if(!Number.isNaN(pageNumber)) {
      this.productFilter.pageNumber = pageNumber;
      this.listProducts(this.productFilter)
    }
  }

  ByLowPrice(item: any) {
    this.selectedCategory = item;
    this.productFilter.filterByLowPrice = true;
    this.listProducts(this.productFilter)
  }

  ByHighPrice(item: any) {
    this.selectedCategory = item;
    this.productFilter.filterByHighPrice = true;
    this.listProducts(this.productFilter)
  }
}
