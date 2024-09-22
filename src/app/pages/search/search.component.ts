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
      console.log(this.productsDto);
    })
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.productFilter.searchTerm = value;
    this.listProducts(this.productFilter)
  }

  //filter dropdown
  Changecategory(item: any, icon: any, property: any) {
  
  }
}