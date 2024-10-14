import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

//Data Get
import { ProductFilter } from 'src/app/models/products/productFilter';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductDto } from 'src/app/models/products/productDto';
import { environment } from 'src/environments/environment';
import { DecimalPipe } from '@angular/common';
import { CategoryService } from '../category/category.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [CategoryService, DecimalPipe]
})
export class SearchComponent  implements OnInit {

  breadCrumbItems!: Array<{}>;
  products: any;
  selectedCategory: any;
  itemicon: any;
  isDesc: boolean = false;

  // Table data
  total: Observable<number>;

  productFilter = new ProductFilter();
  productsDto: ProductDto[];
  categoryDescription: string;
  queryFilter: string;

  productImageUrlStaticFile: string = environment.apiUrlProductStaticFilesv1;

  constructor(public service: CategoryService,
              private route: ActivatedRoute,
              private productService: ProductService
             ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.queryFilter = params['query'];
      this.productFilter.searchTerm = this.queryFilter;
      this.listProducts(this.productFilter);

    });

    this.productFilter.searchTerm = this.queryFilter;

    this.listProducts(this.productFilter);

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //Fethch Data
    this.selectedCategory = 'Todos'
    this.itemicon = 'thumb-up'

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Resultados' },
      { label: this.productFilter.searchTerm, active: true }
    ];
    
  }

  listProducts(filter: ProductFilter) {
    this.productService.getAll(filter).subscribe(response => {
      this.productsDto = response.data.items;
      console.log(this.productsDto);
    })
  }

  onInputChange(event: Event): void {
    let value = (event.target as HTMLInputElement).value;

    this.productFilter.searchTerm = value;
    this.listProducts(this.productFilter)
  }

  //filter dropdown
  Changecategory(item: any, icon: any, property: any) {
  
  }
}
