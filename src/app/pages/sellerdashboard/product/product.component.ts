import { Component, OnInit } from '@angular/core';
import { product } from './data';

// Sweet Alert
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductDto } from 'src/app/models/products/productDto';
import { ToastrService } from 'ngx-toastr';
import { ProductFilter } from 'src/app/models/products/productFilter';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

// Product Component
export class ProductComponent implements OnInit {
  products: ProductDto[] = [];

  sortfilter: any;
  isDesc: boolean = false;

  errors: any = [];

  filter = new ProductFilter();
  productImageUrlStaticFile: string = environment.apiUrlProductStaticFilesv1;
  productFilter = new ProductFilter();

  queryFilter:string;

  pagination: any;
  private _total$ = new BehaviorSubject<number>(0);

  constructor(private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    document.documentElement.scrollTop = 0;

    this.listProduct(this.filter);
    
    this.sortfilter = 'title';

  }

  listProduct(filter: ProductFilter) {
    this.filter.pageSize = 4;
    this.productService.getProductsByUser(filter).subscribe(response => {
      this.products = response.data.items;
      this.pagination = response.data;
      this._total$.next(response.data.totalItems);
    });
  }

  get total$() { return this._total$.asObservable(); }

  removeProduct(id:string) {
    this.productService.remove(id)  .subscribe(
      sucesso => { this.handleSuccessRemove() },
      erros => { this.handleFailure(erros) }
    );
  }


  handleSuccessRemove() {
    this.errors = [];

    Swal.fire({ title: 'Excluido!', text: 'O produto foi excluido com sucesso.', confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', });
    this.listProduct(this.filter);
  }

  handleFailure(fail: any){
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  removeproduct(id:string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Este produto será removido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sim, Remover!',
      cancelButtonText: 'Não, cancelar!',
    }).then(result => {
      if (result.value) {
        this.removeProduct(id);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Remoção do produto cancelada :)',
          icon: 'info',
          confirmButtonColor: 'rgb(3, 142, 220)',
          confirmButtonText: 'Ok!',
        })
      }
    });
  }

  onKeyUp(event:Event) {
    this.filter.searchTerm = this.queryFilter;
    this.listProduct(this.filter);
  }

  filtering() {

  }

  paginate(pageNumber: number) {
    if(!Number.isNaN(pageNumber)) {
      this.filter.pageNumber = pageNumber;
      this.listProduct(this.filter);
    }
  }

}
